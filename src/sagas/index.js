import { all, fork } from 'redux-saga/effects';

import * as userSagas from './user';
import * as listsSagas from './lists';
import * as filesSagas from './files';

function* rootSaga() {
  yield all([
    fork(userSagas.findUserByCodeSaga),
    fork(userSagas.sendPasswordToEmailFromUserSaga),
    fork(userSagas.checkIsAValidApplicantSaga),

    fork(listsSagas.findListsByUserIdSaga),
    fork(listsSagas.createListByUserIdAndTypeSaga),
    fork(listsSagas.enrollUserToListSaga),
    fork(listsSagas.removeUserFromListSaga),
    fork(listsSagas.finishRegistrationListSaga),
    fork(listsSagas.deleteListSaga),
    fork(listsSagas.getListsForAdminSaga),

    fork(filesSagas.saveOneFileSaga),
    fork(filesSagas.getAllFilesFromListSaga),
    fork(filesSagas.deleteOneFileSaga)
  ]);
}

export default rootSaga;
