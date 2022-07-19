import { actionTypes } from "./actionTypes";
import { SecurityGlobalState } from "./models";

export const securityInitialState: SecurityGlobalState = {
    user: null,
    isAuthenticated: false,
    login: {
        message: '',
    },
    logout: {
        message: '',
        isReady: false,
    },
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