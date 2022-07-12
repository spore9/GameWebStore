import { TaskActionGenerators } from "Foundation/Framework/client/tasks/utils";
import { keyMirror} from "Foundation/Framework/client/utils";

export const SECURITY_NAMESPACE = 'SECURITY_NAMESPACE';

const initialActionTypes = keyMirror(
    {
        COMPLETE_SIGN_IN: null,
        COMPLETE_SIGN_OUT: null,
        SIGN_IN: null,
        SIGN_OUT: null,
    },
    SECURITY_NAMESPACE
  );
  export const actionTypes = {
    ...initialActionTypes,
    SIGN_IN: TaskActionGenerators.createActionTypes(initialActionTypes.SIGN_IN),
    SIGN_OUT: TaskActionGenerators.createActionTypes(initialActionTypes.SIGN_OUT),
  };