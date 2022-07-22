export interface Action<T = {}> {
    type: string;
    payload?: T;
  }
  
  export class Action<T = {}> implements Action<T> {
    public type: string;
    public payload?: T;
  }

  export interface RouteElement {
    path?: string,
    component?: React.ReactElement,
    requireAuth?: boolean;
    index?: boolean;
  }