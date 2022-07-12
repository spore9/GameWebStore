import { UserManager } from 'oidc-client';
import { createUserManager } from 'redux-oidc';

export class UserManagerFactory {
    public static userManager: UserManager;
    static createUserManager(userManagerConfig: any) {
        return UserManagerFactory.userManager = createUserManager(userManagerConfig);
    }
}

export function createArguments(state) {
    return { useReplaceToNavigate: true, data: state };
}