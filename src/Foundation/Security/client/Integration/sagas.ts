import { UserManager, WebStorageStateStore } from "oidc-client";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as UserUtils from "../utils";
import { actionTypes } from "./actionTypes";
import * as actions from "./actions";
import * as api from "./api";
import { ApplicationName, QueryParameterNames } from "./ApiAuthorizationConstants";
import { AuthConfigurationInputModel } from "../GeneratedModels/auth-configuration-input-model";
import { NetworkStatus } from "@apollo/client";
import { loadUser } from "redux-oidc";
import store from "Project/GameWebStore.Project/client/Root/store";

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
    const settings = response.data.configuration;
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

export function* initUserManager():SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);
    loadUser(store, userManager);
}

export function* signIn(): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);
    try {
        yield put(actions.SignInRequest());
        const silentUser = yield call([userManager, userManager.signinSilent], UserUtils.createArguments(null));
        yield put(actions.SignInSuccess());
    } catch (silentError) {
        // User might not be authenticated, fallback to popup authentication
        console.log("Silent authentication error: ", silentError);

        try {
            const popUpUser = yield call([userManager, userManager.signinPopup], UserUtils.createArguments(null));
            yield put(actions.SignInSuccess());
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
export function* completeSignIn(action): SagaIterator {
    const {url} = action?.payload;
    try {
        const userManager: UserManager = yield call(ensureUserManagerInitialized);

        yield call([userManager, userManager.signinCallback], url);
    } catch (error) {
        console.log('There was an error signing in: ', error);
        yield put(actions.SignInFailure('There was an error signing in.'));
    }
}

export function* redirectToUrlFromQuery(): SagaIterator {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get(QueryParameterNames.ReturnUrl);
    if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
        // This is an extra check to prevent open redirects.
        throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
    }
    const ReturnUrl = fromQuery || `${window.location.origin}/`;

    if (!!ReturnUrl) {
        window.location.replace(ReturnUrl);
    }
}

export function* signOut(): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);

    try {
        yield put(actions.SignOutRequest());
        yield call([userManager, userManager.signoutPopup], UserUtils.createArguments(null));
        yield put(actions.SignOutSuccess());
    } catch (popupSignOutError) {
        console.log("Popup signout error: ", popupSignOutError);
        try {
            yield call([userManager, userManager.signoutRedirect], UserUtils.createArguments(null));
        } catch (redirectSignOutError) {
            console.log("Redirect signout error: ", redirectSignOutError);
            yield put(actions.SignOutFailure(redirectSignOutError));
        }
    }
}
export function* completeSignOut(url): SagaIterator {
    const userManager: UserManager = yield call(ensureUserManagerInitialized);
    try {
        yield call([userManager, userManager.signoutCallback], url);
    } catch (error) {
        console.log(`There was an error trying to log out '${error}'.`);
        yield put(actions.SignOutFailure(error));
    }
}

function* watch(): SagaIterator {
    yield takeLatest(actionTypes.INIT_USER_MANAGER, initUserManager);
    yield takeEvery(actionTypes.SIGN_IN.action, signIn);
    yield takeEvery(actionTypes.SIGN_OUT.action, signOut);
    yield takeEvery(actionTypes.SIGN_IN_CALLBACK, completeSignIn);
    yield takeEvery(actionTypes.SIGN_OUT_CALLBACK, completeSignOut);
    yield takeEvery(actionTypes.SIGN_IN.success, redirectToUrlFromQuery);
    yield takeEvery(actionTypes.SIGN_OUT.success, redirectToUrlFromQuery);

}
export default [watch()];