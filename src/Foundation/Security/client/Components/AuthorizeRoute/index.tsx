import * as React from 'react';
import { ApplicationPaths, QueryParameterNames } from '../../Integration/ApiAuthorizationConstants';
import { AuthorizeRouteProps } from './models';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../Integration/selectors';

export const AuthorizeRoute: React.FC<AuthorizeRouteProps> = ({path, component, ...rest}) => {
    const authenticated =  useSelector(getIsAuthenticated);
    const [isready, setIsReady] = React.useState(false);
    React.useEffect(() => {
        setIsReady(true);
    },[]);
    const link = document.createElement("a");
    link.href = path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`


    if (!isready) {
        return <div></div>;
      } else {
        return authenticated ? component : <Navigate replace to={redirectUrl} />;
      }
}