import {ApiAuthorizationRoutes} from 'Feature/Account/client/Integration/ApiAuthorizationRoutes';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { RouteElement } from 'Foundation/Framework/client/models';
import * as React from 'react';

export const AppRoutes: Array<RouteElement> = [
  {
    index: true,
    component: <Home />
  },
  {
    path: '/counter',
    component: <Counter/>
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    component: <FetchData/>
  },
  ...ApiAuthorizationRoutes
];
