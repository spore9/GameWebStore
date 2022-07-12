import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { securityReducer } from 'Foundation/Security/client/Integration';
import { tasksReducer } from 'Foundation/Framework/client';


const SagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    securityReducer,
    tasksReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
  },
})

SagaMiddleware.run(rootSaga);