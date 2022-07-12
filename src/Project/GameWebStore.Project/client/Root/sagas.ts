import * as Security from 'Foundation/Security/client/Integration';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...Security.rootSaga,
    ]);
}