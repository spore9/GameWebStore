import * as React from 'react';
import { ApplicationPaths, LoginActions, LogoutActions } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';
import { Login } from '../Components/Login';
import { Logout } from '../Components/Logout';
import { RouteElement } from 'Foundation/Framework/client/models';

export const ApiAuthorizationRoutes: Array<RouteElement> = [
  {
    path: ApplicationPaths.Login,
    component: loginAction(LoginActions.Login),
  },
  {
    path: ApplicationPaths.LoginFailed,
    component: loginAction(LoginActions.LoginFailed)
  },
  {
    path: ApplicationPaths.LoginCallback,
    component: loginAction(LoginActions.LoginCallback)
  },
  {
    path: ApplicationPaths.Profile,
    component: loginAction(LoginActions.Profile)
  },
  {
    path: ApplicationPaths.Register,
    component: loginAction(LoginActions.Register)
  },
  {
    path: ApplicationPaths.LogOut,
    component: logoutAction(LogoutActions.Logout)
  },
  {
    path: ApplicationPaths.LogOutCallback,
    component: logoutAction(LogoutActions.LogoutCallback)
  },
  {
    path: ApplicationPaths.LoggedOut,
    component: logoutAction(LogoutActions.LoggedOut)
  }
];

function loginAction(name): React.ReactElement{
  return <Login actionName={name}></Login>;
}

function logoutAction(name) {
  return <Logout actionName={name}></Logout>;
}