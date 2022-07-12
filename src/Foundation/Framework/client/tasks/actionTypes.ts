import { keyMirror } from "../utils";

export const TASK_NAMESPACE = 'TASK';

export const actionTypes = keyMirror(
  {
    BEGIN: null,
    FAILURE: null,
    SUCCESS: null,
    RESET: null,
  },
  TASK_NAMESPACE
);
