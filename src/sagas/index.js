import { all, fork } from 'redux-saga/effects';

import {
  findUserByCodeSaga,
  sendPasswordToEmailFromUserSaga,
} from './user';

function* rootSaga() {
  yield all([
    fork(findUserByCodeSaga),
    fork(sendPasswordToEmailFromUserSaga),
  ]);
}

export default rootSaga;
