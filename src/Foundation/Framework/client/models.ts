export interface Action<T = {}> {
    type: string;
    payload?: T;
  }
  
  export class Action<T = {}> implements Action<T> {
    public type: string;
    public payload?: T;
  }