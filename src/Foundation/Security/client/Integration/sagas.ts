import { UserManager, WebStorageStateStore } from "oidc-client";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from 'redux-saga/effects'
import * as UserUtils from "../utils";
import { actionTypes } from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";
import { ApplicationName } from "./ApiAuthorizationConstants";
import { AuthConfigurationInputModel } from "../GeneratedModels/auth-configuration-input-model";
import { NetworkStatus } from "@apollo/client";

export function* ensureUserManagerInitialized(): SagaIterator {
    let userManager = UserUtils.UserManagerFactory.userManager;
    if (userManager !== undefined) {
        return userManager;
    }
    const authParameters: AuthConfigurationInputModel = { clientId: ApplicationName };

    const response = yield call(api.requestAlipayRedirectData, authParameters);
    if (response.networkStatus !== NetworkStatus.ready && !!response.data?.configuration) {
        throw new Error(`Could not load settings for '${ApplicationName}'`);
    }
    let settings = response.data.configuration;
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    settings.userStore = new WebStorageStateStore({
        prefix: ApplicationName
    });

    userManager = UserUtils.UserManagerFactory.createUserManager(settings);
    userManager.events.addUserSignedOut(async () => {
        await userManager.removeUser();
    });
    return userManager;
}

export function* signIn(): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);
    try {
        yield put(actions.SignInRequest());
        const silentUser = yield call([userManager, userManager.signinSilent], UserUtils.createArguments(null));
        yield put(actions.SignInSuccess(silentUser));
    } catch (silentError) {
        // User might not be authenticated, fallback to popup authentication
        console.log("Silent authentication error: ", silentError);

        try {
            const popUpUser = yield call([userManager, userManager.signinPopup], UserUtils.createArguments(null));
            yield put(actions.SignInSuccess(popUpUser));
        } catch (popUpError) {
            if (popUpError.message === "Popup window closed") {
                // The user explicitly cancelled the login action by closing an opened popup.
                yield put(actions.SignInFailure("The user closed the window."));
            } else {
                console.log("Popup authentication error: ", popUpError);
            }

            // PopUps might be blocked by the user, fallback to redirect
            try {
                yield call([userManager, userManager.signinRedirect], UserUtils.createArguments(null));
            } catch (redirectError) {
                console.log("Redirect authentication error: ", redirectError);
                yield put(actions.SignInFailure("Failed to signin"));
            }
        }
    }
}
export function* completeSignIn(url): SagaIterator {
    try {
        const userManager: UserManager = yield call(ensureUserManagerInitialized);

        const user = yield call([userManager, userManager.signinCallback], url);
        yield put(actions.SignInSuccess(user));
    } catch (error) {
        console.log('There was an error signing in: ', error);
        yield put(actions.SignInFailure('There was an error signing in.'));
    }
}

export function* signOut(): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);

    try {
        yield put(actions.SignOutRequest());
        yield call(userManager.signoutPopup, UserUtils.createArguments(null));
        yield put(actions.SignOutSuccess());
    } catch (popupSignOutError) {
        console.log("Popup signout error: ", popupSignOutError);
        try {
            yield call(userManager.signoutRedirect, UserUtils.createArguments(null));
        } catch (redirectSignOutError) {
            console.log("Redirect signout error: ", redirectSignOutError);
            yield put(actions.SignOutFailure(redirectSignOutError));
        }
    }
}
export function* completeSignOut(url): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);
    try {
        yield call(userManager.signoutCallback, url);
        yield put(actions.SignOutSuccess());
    } catch (error) {
        console.log(`There was an error trying to log out '${error}'.`);
        yield put(actions.SignOutFailure(error));
    }
}

function* watch(): SagaIterator {
    yield takeEvery(actionTypes.SIGN_IN.action, signIn);
    yield takeEvery(actionTypes.SIGN_OUT.action, signOut);
    yield takeEvery(actionTypes.COMPLETE_SIGN_IN, completeSignIn);
    yield takeEvery(actionTypes.COMPLETE_SIGN_OUT, completeSignOut);
}
export default [watch()];