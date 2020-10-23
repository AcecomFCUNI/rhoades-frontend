import { all, fork } from 'redux-saga/effects';

import findUserByConditionAndCode from './findUserByConditionAndCode';

function* rootSaga() {
  yield all([fork(findUserByConditionAndCode)]);
}

export default rootSaga;
