import { CompleteSignIn, SignIn } from 'Foundation/Security/client/Integration/actions';
import { ApplicationPaths, LoginActions, QueryParameterNames } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';
import { getLoginMessage } from 'Foundation/Security/client/Integration/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LoginProps } from './models';

export const Login: React.FC<LoginProps> = ({actionName}) => {
    const dispatch = useDispatch();
    const message = useSelector(getLoginMessage);
    let redirectUrl = '';

    React.useEffect(() => {
        switch (actionName) {
            case LoginActions.Login:
                dispatch(SignIn());
                break;
            case LoginActions.LoginCallback:
                const url = window.location.href;
                dispatch(CompleteSignIn({url}));
                break;
            case LoginActions.Profile:
                redirectUrl = `${window.location.origin}/${ApplicationPaths.IdentityRegisterPath}?${QueryParameterNames.ReturnUrl}=${encodeURI(ApplicationPaths.Login)}`;
                // TODO: implement change route
                window.location.replace(redirectUrl);
                break;
            case LoginActions.Register:
                redirectUrl = `${window.location.origin}/${ApplicationPaths.IdentityManagePath}`;
                // TODO: implement change route
                window.location.replace(redirectUrl);
                break;
            default:
                throw new Error(`Invalid action '${actionName}'`);
        }
      }, [actionName]);

    if (!!message) {
        return <div>{message}</div>
    } else {
        switch (actionName) {
            case LoginActions.Login:
                return (<div>Processing login</div>);
            case LoginActions.LoginCallback:
                return (<div>Processing login callback</div>);
            case LoginActions.Profile:
            case LoginActions.Register:
                return (<div></div>);
            default:
                throw new Error(`Invalid action '${actionName}'`);
        }
    }
}