import { getTaskStatus } from 'Foundation/Framework/client/tasks/selectors';
import { createSelector } from 'reselect';
import { actionTypes } from './actionTypes';
import { SecurityGlobalState } from './models';

export const getSignInStatus = createSelector(
    getTaskStatus(actionTypes.SIGN_IN.action),
    status => status,
  );

  export const getSignOutStatus = createSelector(
    getTaskStatus(actionTypes.SIGN_OUT.action),
    status => status,
  );

  export const getIsAuthenticated = createSelector(
    (state: SecurityGlobalState) => state.security.user,
    (value) => !!value,
  );

  export const getUserName = createSelector(
    (state: SecurityGlobalState) => state.security.user?.profile?.name,
    (value) => value,
  );

  export const getAccessToken = createSelector(
    (state: SecurityGlobalState) => state.security.user?.access_token,
    (value) => value,
  );

  export const getLoginMessage = createSelector(
    (state: SecurityGlobalState) => state.securityComponents.login?.message,
    (value) => value,
  );

  export const getLogoutMessage = createSelector(
    (state: SecurityGlobalState) => state.securityComponents.logout?.message,
    (value) => value,
  );

  export const getIsLogoutReady = createSelector(
    (state: SecurityGlobalState) => state.securityComponents.logout?.isReady,
    (value) => value,
  );