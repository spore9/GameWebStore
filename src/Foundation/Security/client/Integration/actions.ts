import { TaskActionGenerators } from "Foundation/Framework/client/tasks/utils";
import { actionTypes } from "./actionTypes";
import * as DataModels from "./models";

const signIn = TaskActionGenerators.createActions<Record<string, unknown>, DataModels.SignInResult>(actionTypes.SIGN_IN);
export const SignIn = signIn.action;
export const SignInRequest = signIn.beginRequest;
export const SignInFailure = signIn.requestFailure;
export const SignInSuccess = signIn.requestSuccess;

const signOut = TaskActionGenerators.createActions<Record<string, unknown>, Record<string, unknown>>(actionTypes.SIGN_OUT);
export const SignOut = signOut.action;
export const SignOutRequest = signOut.beginRequest;
export const SignOutFailure = signOut.requestFailure;
export const SignOutSuccess = signOut.requestSuccess;

export const SignInCallback = (payload: DataModels.CompelteSignInOut) => ({
    payload,
    type: actionTypes.SIGN_IN_CALLBACK,
  });
  
  export const SignOutCallback = (payload: DataModels.CompelteSignInOut) => ({
    payload,
    type: actionTypes.SIGN_OUT_CALLBACK,
  });

  export const InitUserManager = () => ({
    type: actionTypes.INIT_USER_MANAGER,
  });