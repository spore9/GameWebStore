import { UserState } from "redux-oidc";

export interface SecurityGlobalState {
    securityComponents: SecurityComponentsState;
    security: UserState;
}
export interface SecurityComponentsState {
    login: LoginState;
    logout: LogoutState;
}
export interface LoginState {
    message: string;
}
export interface LogoutState {
    message: string;
    isReady: boolean;
}
export interface CompelteSignInOut {
    url: string;
}