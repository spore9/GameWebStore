import { SignOutCallback, SignOut } from 'Foundation/Security/client/Integration/actions';
import { LogoutActions } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';
import { getIsAuthenticated, getIsLogoutReady, getLogoutMessage } from 'Foundation/Security/client/Integration/selectors';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutProps } from './models';


export const Logout: React.FC<LogoutProps> = ({ actionName }) => {
    const dispatch = useDispatch();

    const message = useSelector(getLogoutMessage);
    const isReady = useSelector(getIsLogoutReady);
    const isAuthenticated = useSelector(getIsAuthenticated);

    React.useEffect(() => {


        switch (actionName) {
            case LogoutActions.Logout:
                if (isAuthenticated) {
                    dispatch(SignOut());
                }
                break;
            case LogoutActions.LogoutCallback:
                const url = window.location.href;
                dispatch(SignOutCallback({ url }));
                break;
        }
    }, [actionName]);


    if (!isReady) {
        return <div></div>
    }
    if (!!message) {
        return (<div>{message}</div>);
    } else {
        switch (actionName) {
            case LogoutActions.Logout:
                return (<div>Processing logout</div>);
            case LogoutActions.LogoutCallback:
                return (<div>Processing logout callback</div>);
            case LogoutActions.LoggedOut:
                return (<div>{message}</div>);
            default:
                throw new Error(`Invalid action '${actionName}'`);
        }
    }
}