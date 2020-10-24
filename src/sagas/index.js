import { all, fork } from 'redux-saga/effects';

import { findUserByConditionAndCodeSaga } from './user';

function* rootSaga() {
  yield all([fork(findUserByConditionAndCodeSaga)]);
}

export default rootSaga;
