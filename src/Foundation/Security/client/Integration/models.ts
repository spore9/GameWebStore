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
    loginMessage: string;
    logoutMessage: string;
    isReady: boolean;
}
export interface LoggedUser {
    user: string;
}
export interface CompelteSignInOut {
    url: string;
}