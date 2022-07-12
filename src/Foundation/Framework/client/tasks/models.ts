import { Action } from "../models";

export interface TaskActionTypes {
    action: string;
    begin: string;
    failure: string;
    success: string;
  }
  export interface TaskPayload<TModel = {}> {
    data?: TModel;
    error?: any;
    originAction: string;
  }
  export interface TaskActions<TInputModel, TOutputModel> {
    action: (model?: TInputModel) => Action<TaskPayload<TInputModel>>;
    beginRequest: () => Action<TaskPayload>;
    requestSuccess: (model?: TOutputModel) => Action<TaskPayload<TOutputModel>>;
    requestFailure: (message: string) => Action<TaskPayload>;
  }

  export enum TaskProgressStatus {
    InProgress = 'In Progress',
    NotStarted = 'Not Started',
    Failed = 'Fail',
    Succeeded = 'Success',
  }

  export interface Task {
    status: TaskProgressStatus;
    error?: any;
  }

  export interface TaskState {
    [taskAction: string]: Task;
  }

  export interface TaskFlowPayload {
    originAction: string;
    error?: any;
  }

  export interface GlobalTaskState {
    tasks: TaskState;
  }