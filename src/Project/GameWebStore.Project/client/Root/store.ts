import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { securityReducer } from 'Foundation/Security/client/Integration';
import { tasksReducer } from 'Foundation/Framework/client';
import { reducer as oidcReducer } from 'redux-oidc';

const SagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    securityComponents: securityReducer,
    tasks: tasksReducer,
    security: oidcReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(SagaMiddleware);
  },
})

SagaMiddleware.run(rootSaga);