import { actionTypes } from "./actionTypes";
import { SecurityComponentsState } from "./models";

export const securityInitialState: SecurityComponentsState = {
    login: {
        message: '',
    },
    logout: {
        message: '',
        isReady: false,
    },
};

export const securityReducer = (state: SecurityComponentsState = securityInitialState, action: any) => {
    switch (action.type) {
        case actionTypes.SIGN_IN.success: {
            const { message } = action.payload?.data;

            return {
                ...state,
                login: {
                    message,
                }
            };
        }

        case actionTypes.SIGN_OUT.success: {
            const { message } = action.payload;

            return {
                ...state,
                logout: {
                    message,
                    isReady: true,
                }
            };
        }

        case actionTypes.SIGN_OUT.begin: {
            return {
                ...state,
                logout: {
                    message: null,
                    isReady: false,
                }
            };
        }

        case actionTypes.SIGN_IN.begin: {
            return {
                ...state,
                login: {
                    message: null,
                }
            };
        }

        default:
            return state;
    }
};