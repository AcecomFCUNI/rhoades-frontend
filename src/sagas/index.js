import { all, fork } from 'redux-saga/effects';

import {
  findUserByCodeSaga,
  sendPasswordToEmailFromUserSaga,
} from './user';

import {
  findListsByUserIdSaga,
  createListByUserIdAndTypeSaga
} from './lists';

function* rootSaga() {
  yield all([
    fork(findUserByCodeSaga),
    fork(sendPasswordToEmailFromUserSaga),
    fork(findListsByUserIdSaga),
    fork(createListByUserIdAndTypeSaga),
  ]);
}

export default rootSaga;
