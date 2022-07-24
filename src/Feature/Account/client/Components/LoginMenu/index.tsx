import { getIsAuthenticated, getUserName } from 'Foundation/Security/client/Integration/selectors';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import { LoginMenuProps } from './models';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';
import { InitUserManager } from 'Foundation/Security/client/Integration/actions';

export const LoginMenu: React.FC<LoginMenuProps> = () => {
    const userName = useSelector(getUserName);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(getIsAuthenticated);

    React.useEffect(() => {
        dispatch(InitUserManager());
    },[]);

    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}`;
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };

    return (<>
        {isAuthenticated ? <>
        <NavItem>
            <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
        </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem></> : <>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem> </>}
    </>);
}