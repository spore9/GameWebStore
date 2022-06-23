export interface LoginProps {
    action: any;
}
export interface LoginState {
    message: string;
}

export interface LogoutProps {
    action: any;
}
export interface LogoutState {
    message: string;
    isReady: boolean;
    authenticated: boolean;
}

export interface LoginMenuProps {
}
export interface LoginMenuState {
    userName: string;
    isAuthenticated: boolean;
}