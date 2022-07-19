import { User } from "oidc-client";

export interface AuthorizeServiceProps {
    userManager: userManagerProps;
}
export interface userManagerProps {
    getUser: any;
}
export interface SecurityGlobalState {
    user: User;
    isAuthenticated: boolean;
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
export interface LoggedUser {
    user: string;
}
export interface CompelteSignInOut {
    url: string;
}