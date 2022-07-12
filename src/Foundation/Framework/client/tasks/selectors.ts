import { GlobalTaskState, Task, TaskProgressStatus } from "./models";

export const getTask =
  (taskActionName: string) =>
  (state: GlobalTaskState): Task => {
    return state.tasks[taskActionName] || { status: TaskProgressStatus.NotStarted };
  };

  export const getTaskStatus =
  (taskActionName: string) =>
  (state: GlobalTaskState): TaskProgressStatus => {
    const task = getTask(taskActionName)(state);
    return task.status;
  };