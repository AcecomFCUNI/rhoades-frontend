import { takeLatest, put, call } from 'redux-saga/effects';

import {
  findUserByConditionAndCodeSuccess,
  findUserByConditionAndCodeError,
  sendPasswordToEmailFromUserSuccess,
  sendPasswordToEmailFromUserError,
  showAlertSnackbar,
  FIND_USER_BY_CONDITION_AND_CODE_REQUEST,
  SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
} from 'ducks';
import {
  Get,
  Patch,
  decryptJsonFromString,
  createCookie,
  getStringFromObject,
  createNewAlertSnackbarMessage,
  USER_KEY,
  USER_SUCCESSFULLY_FOUND,
  PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY,
  PASSWORD_SENT_TO_EMAIL_ERROR,
} from 'tools';
import { KEY_JSON } from 'keys';

function* getUserFromApi(params) {
  const { message: encryptedMessage } = yield call(
    Get,
    `/user/verify/${params.code}?condition=${params.condition}&documentType=${params.documentType}`
  );

  // decrypt the message
  const decryptedJson = decryptJsonFromString(encryptedMessage, KEY_JSON);

  const cookieUserData = {
    searchParams: params,
    data: encryptedMessage,
  };
  createCookie(
    USER_KEY,
    getStringFromObject(cookieUserData),
    '/validate-credentials'
  );
  yield put(findUserByConditionAndCodeSuccess(decryptedJson));
}

function* findUserByConditionAndCode({ payload: { params, history } }) {
  try {
    yield getUserFromApi(params);
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

function* sendPasswordToEmailFromUser({ payload: { params } }) {
  try {
    const { error } = yield call(
      Patch,
      `/user/notify?condition=${params.condition}`,
      {
        args: {
          id: params.id,
        },
      }
    );

    if (!error) {
      yield put(sendPasswordToEmailFromUserSuccess());

      // refetch the user with the new password created
      yield getUserFromApi(params);
      yield put(showAlertSnackbar(PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY));
    } else {
      yield put(sendPasswordToEmailFromUserError());
      yield put(showAlertSnackbar(PASSWORD_SENT_TO_EMAIL_ERROR));
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put(sendPasswordToEmailFromUserError());
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

export function* sendPasswordToEmailFromUserSaga() {
  yield takeLatest(
    SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
    sendPasswordToEmailFromUser
  );
}
