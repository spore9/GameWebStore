import { Action } from '../models';
import { actionTypes } from './actionTypes';
import { GlobalTaskState, TaskFlowPayload, TaskProgressStatus } from './models';

const initialState: GlobalTaskState = { tasks: {}};
export const tasksReducer = (state: GlobalTaskState = initialState, action: Action<TaskFlowPayload>) => {
    if (!action.payload) {
      return state;
    }
    const { error, originAction } = action.payload;
    switch (action.type) {
        case actionTypes.BEGIN:
        return {
                ...state,
                [originAction]: {
                    ...state[originAction],
                    status: TaskProgressStatus.InProgress,
                },
            };
        case actionTypes.FAILURE:
            return {
                ...state,
                [originAction]: {
                    ...state[originAction],
                    error,
                    status: TaskProgressStatus.Failed,
                },
            };
        case actionTypes.SUCCESS:
            return {
                ...state,
                [originAction]: {
                    ...state[originAction],
                    error: null,
                    status: TaskProgressStatus.Succeeded,
                },
            };
        default:
            return state;
    }
};