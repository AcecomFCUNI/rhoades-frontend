import { all, fork } from 'redux-saga/effects';

import * as userSagas from './user';
import * as listSagas from './lists';

function* rootSaga() {
  yield all([
    fork(userSagas.findUserByCodeSaga),
    fork(userSagas.sendPasswordToEmailFromUserSaga),
    fork(userSagas.checkIsAValidApplicantSaga),
    fork(userSagas.enrollUserToListSaga),

    fork(listSagas.findListsByUserIdSaga),
    fork(listSagas.createListByUserIdAndTypeSaga)
  ]);
}

export default rootSaga;
