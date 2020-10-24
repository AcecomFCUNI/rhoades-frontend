import { takeLatest, put, call } from 'redux-saga/effects';

import {
  findUserByConditionAndCodeSuccess,
  findUserByConditionAndCodeError,
  showAlertSnackbar,
  FIND_USER_BY_CONDITION_AND_CODE_REQUEST,
} from 'ducks';
import {
  Get,
  createCookie,
  getStringFromObject,
  USER_KEY,
  USER_SUCCESSFULLY_FOUND,
  createNewAlertSnackbarMessage,
} from 'tools';

function* findUserByConditionAndCode({ payload: { params, history } }) {
  try {
    const {
      message: { result },
    } = yield call(
      Get,
      `/${params.code}?condition=${params.condition}&documentType=${params.documentType}`
    );
    createCookie(
      USER_KEY,
      getStringFromObject({
        searchParams: params,
        data: result,
      }),
      '/validate-credentials'
    );
    yield put(findUserByConditionAndCodeSuccess(result));
    yield put(showAlertSnackbar(USER_SUCCESSFULLY_FOUND));
    history.push('/validate-credentials');
  } catch (error) {
    const { message } = error.response.data;
    yield put(findUserByConditionAndCodeError(message));
    yield put(
      showAlertSnackbar(createNewAlertSnackbarMessage('error', message))
    );
  }
}

export function* findUserByConditionAndCodeSaga() {
  yield takeLatest(
    FIND_USER_BY_CONDITION_AND_CODE_REQUEST,
    findUserByConditionAndCode
  );
}
