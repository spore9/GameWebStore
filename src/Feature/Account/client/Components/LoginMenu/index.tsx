import { getIsAuthenticated, getUserName } from 'Foundation/Security/client/Integration/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavItem, NavLink } from 'reactstrap';
import { LoginMenuProps } from './models';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';

export const LoginMenu: React.FC<LoginMenuProps> = () => {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const userName = useSelector(getUserName);

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