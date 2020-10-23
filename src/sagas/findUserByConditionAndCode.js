import { takeLatest, put, call } from 'redux-saga/effects';

import {
  FIND_USER_BY_CONDITION_AND_CODE,
  successFindUserByConditionAndCode,
  errorFindUserByConditionAndCode,
  showAlertSnackbar,
} from 'ducks';
import { Get } from 'tools';

// TODO: add or not the persistence with localStorage
function* findUser({
  payload: {
    params: { code, condition, documentType },
    history,
  },
}) {
  try {
    const {
      message: { result },
    } = yield call(
      Get,
      `/${code}?condition=${condition}&documentType=${documentType}`
    );
    history.push('/validate-credentials');
    yield put(successFindUserByConditionAndCode(result));
    yield put(
      showAlertSnackbar(
        'success',
        'El usuario fue encontrado satisfactoriamente'
      )
    );
  } catch (error) {
    const { message } = error.response.data;
    yield put(errorFindUserByConditionAndCode(message));
    yield put(showAlertSnackbar('error', message));
  }
}

export default function* saga() {
  yield takeLatest(FIND_USER_BY_CONDITION_AND_CODE.REQUEST, findUser);
}
