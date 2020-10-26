import { all, fork } from 'redux-saga/effects';

import {
  findUserByConditionAndCodeSaga,
  sendPasswordToEmailFromUserSaga,
} from './user';

function* rootSaga() {
  yield all([
    fork(findUserByConditionAndCodeSaga),
    fork(sendPasswordToEmailFromUserSaga),
  ]);
}

export default rootSaga;
