import * as React from 'react';
import { Route } from 'react-router';
import { ApplicationPaths, LoginActions, LogoutActions } from 'Foundation/Security/client/Integration/ApiAuthorizationConstants';
import { Login } from '../Components/Login';
import { Logout } from '../Components/Logout';


export default class ApiAuthorizationRoutes extends React.Component {

  render () {
    return(
      <>
          <Route path={ApplicationPaths.Login} render={() => loginAction(LoginActions.Login)} />
          <Route path={ApplicationPaths.LoginFailed} render={() => loginAction(LoginActions.LoginFailed)} />
          <Route path={ApplicationPaths.LoginCallback} render={() => loginAction(LoginActions.LoginCallback)} />
          <Route path={ApplicationPaths.Profile} render={() => loginAction(LoginActions.Profile)} />
          <Route path={ApplicationPaths.Register} render={() => loginAction(LoginActions.Register)} />
          <Route path={ApplicationPaths.LogOut} render={() => logoutAction(LogoutActions.Logout)} />
          <Route path={ApplicationPaths.LogOutCallback} render={() => logoutAction(LogoutActions.LogoutCallback)} />
          <Route path={ApplicationPaths.LoggedOut} render={() => logoutAction(LogoutActions.LoggedOut)} />
      </>);
  }
}

function loginAction(name){
    return (<Login actionName={name}></Login>);
}

function logoutAction(name) {
    return (<Logout actionName={name}></Logout>);
}
