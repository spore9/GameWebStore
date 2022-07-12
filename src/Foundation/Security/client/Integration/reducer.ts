import { actionTypes } from "./actionTypes";
import { SecurityGlobalState } from "./models";

export const securityInitialState: SecurityGlobalState = {
    user: null,
    isAuthenticated: false,
    isReady: false,
    loginMessage: '',
    logoutMessage: '',
};

export const securityReducer = (state: SecurityGlobalState = securityInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.SIGN_IN.success: {
            const { user, message } = action.payload;
            const isAuthenticated = !!user;

            return {
                ...state,
                isAuthenticated,
                user,
                loginMessage: message,
            };
        }

        case actionTypes.SIGN_OUT.success: {
            const { message } = action.payload;

            return {
                ...state,
                logoutMessage: message,
                isReady: true,
            };
        }

        case actionTypes.SIGN_OUT.begin: {
            return {
                ...state,
                logoutMessage: null,
                isReady: false,
            };
        }

        case actionTypes.SIGN_IN.begin: {
            return {
                ...state,
                loginMessage: null,
            };
        }

        default:
            return state;
    }
};