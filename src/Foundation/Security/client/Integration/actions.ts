import { TaskActionGenerators } from "Foundation/Framework/client/tasks/utils";
import { User } from "oidc-client";
import { actionTypes } from "./actionTypes";
import { CompelteSignInOut } from "./models";

const signIn = TaskActionGenerators.createActions<Record<string, unknown>, User>(actionTypes.SIGN_IN);
export const SignIn = signIn.action;
export const SignInRequest = signIn.beginRequest;
export const SignInFailure = signIn.requestFailure;
export const SignInSuccess = signIn.requestSuccess;

const signOut = TaskActionGenerators.createActions<Record<string, unknown>, Record<string, unknown>>(actionTypes.SIGN_OUT);
export const SignOut = signIn.action;
export const SignOutRequest = signIn.beginRequest;
export const SignOutFailure = signIn.requestFailure;
export const SignOutSuccess = signIn.requestSuccess;

export const CompleteSignIn = (payload: CompelteSignInOut) => ({
    payload,
    type: actionTypes.COMPLETE_SIGN_IN,
  });

  export const CompleteSignOut = (payload: CompelteSignInOut) => ({
    payload,
    type: actionTypes.COMPLETE_SIGN_OUT,
  });