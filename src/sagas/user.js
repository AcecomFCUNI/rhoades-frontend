import { takeLatest, put, call } from 'redux-saga/effects';

import {
  findUserByCodeSuccess,
  findUserByCodeError,
  sendPasswordToEmailFromUserSuccess,
  sendPasswordToEmailFromUserError,
  showAlertSnackbar,
  FIND_USER_BY_CODE_REQUEST,
  SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
  storeUserFoundOnCookies,
} from 'ducks';
import {
  Get,
  Patch,
  createNewAlertSnackbarMessage,
  USER_SUCCESSFULLY_FOUND,
  PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY,
  PASSWORD_SENT_TO_EMAIL_ERROR,
  getCookie,
  setCookie,
  USER_KEY,
  removeCookie,
} from 'tools';

function* findUserByCode({ payload: { params, history } }) {
  try {
    const {
      message: { result },
    } = yield call(
      Get,
      `/user/verify/${params.code}?documentType=${params.documentType}`
    );
    yield setCookie(USER_KEY, { searchParams: params, data: result });
    yield put(findUserByCodeSuccess(result));
    yield put(showAlertSnackbar(USER_SUCCESSFULLY_FOUND));
    history.push('/validate-credentials');
  } catch (error) {
    const {
      message: { result }
    } = error.response.data;
    yield put(findUserByCodeError(result));
    yield put(
      showAlertSnackbar(createNewAlertSnackbarMessage('error', result))
    );
  }
}

function* sendPasswordToEmailFromUser({
  payload: {
    user
  },
}) {
  try {
    const { error } = yield call(
      Patch,
      '/user/notify',
      {
        args: {
          id: user.id,
        },
      }
    );
    if(error) {
      yield put(sendPasswordToEmailFromUserError());
      yield put(showAlertSnackbar(PASSWORD_SENT_TO_EMAIL_ERROR));
    }
    else {
      const { searchParams } = getCookie(USER_KEY)
      const registeredState = { 
        searchParams, 
        data: {
          ...user,
          registered: true
        } 
      }
      console.log(registeredState)
      // remove and update the cookie
      removeCookie(USER_KEY)
      setCookie(USER_KEY, registeredState)
      yield put(storeUserFoundOnCookies(registeredState));
      yield put(sendPasswordToEmailFromUserSuccess());
      yield put(showAlertSnackbar(PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY));
    }
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(sendPasswordToEmailFromUserError());
    yield put(
      showAlertSnackbar(createNewAlertSnackbarMessage('error', result))
    );
  }
}

export function* findUserByCodeSaga() {
  yield takeLatest(
    FIND_USER_BY_CODE_REQUEST,
    findUserByCode
  );
}

export function* sendPasswordToEmailFromUserSaga() {
  yield takeLatest(
    SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
    sendPasswordToEmailFromUser
  );
}

