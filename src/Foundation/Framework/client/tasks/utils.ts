import { taskActionEndings } from "./constants";
import { TaskActions, TaskActionTypes } from "./models";

export const actionTypesByOriginAction: Record<string, TaskActionTypes> = {};
export const actionsByOriginAction: Record<string, any> = {};

export class TaskActionGenerators {
    public static createActionTypes = (actionName: string, actionGroup?: string): TaskActionTypes => {
      return (actionTypesByOriginAction[actionName] = {
        action: actionName,
        begin: `${actionName}${taskActionEndings.begin}`,
        failure: `${actionName}${taskActionEndings.failure}`,
        success: `${actionName}${taskActionEndings.success}`,
      });
    };
    public static createActions<TInputModel, TOutputModel>(
        actionTypes: TaskActionTypes,
      ): TaskActions<TInputModel, TOutputModel> {
        return (actionsByOriginAction[actionTypes.action] = {
            action: (model?: TInputModel) => ({
              payload: {
                data: model,
                originAction: actionTypes.action,
              },
              type: actionTypes.action,
            }),
            beginRequest: () => ({
              payload: {
                originAction: actionTypes.action,
              },
              type: actionTypes.begin,
            }),
            requestFailure: (message: string) => {
              const errorData = { message };
      
              return {
                payload: {
                  error: errorData,
                  originAction: actionTypes.action,
                },
                type: actionTypes.failure,
              };
            },
            requestSuccess: (model?: TOutputModel) => ({
              payload: {
                data: model,
                originAction: actionTypes.action,
              },
              type: actionTypes.success,
            }),
          });
      }
}