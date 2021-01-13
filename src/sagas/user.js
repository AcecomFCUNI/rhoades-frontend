import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';

function* findUserByCode(action) {
  try {
    const { params, history } = action.payload
    const {
      message: { result },
    } = yield call(
      tools.Get,
      `/user/verify/${params.code}?documentType=${params.documentType}`
    );
    yield tools.setCookie(tools.USER_KEY, { searchParams: params, data: result });
    yield put(ducks.findUserByCodeSuccess(result));
    yield put(ducks.showAlertSnackbar(tools.USER_SUCCESSFULLY_FOUND));
    history.push('/validate-credentials');
  } catch (error) {
    const {
      message: { result }
    } = error.response.data;
    yield put(ducks.findUserByCodeError(result));
    yield put(
      ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result))
    );
  }
}

function* sendPasswordToEmailFromUser(action) {
  try {
    const { user: { data: user, gender } } = action.payload
    const { error } = yield call(
      tools.Patch,
      '/user/notify',
      {
        args: {
          id: user.id,
          gender
        },
      }
    );

    if(error) {
      yield put(ducks.sendPasswordToEmailFromUserError());
      yield put(ducks.showAlertSnackbar(tools.PASSWORD_SENT_TO_EMAIL_ERROR));
    }
    else {
      const { searchParams } = tools.getCookie(tools.USER_KEY)
      const registeredState = { 
        searchParams, 
        data: {
          ...user,
          registered: true,
          gender
        } 
      }
      // remove and update the cookie
      tools.removeCookie(tools.USER_KEY)
      tools.setCookie(tools.USER_KEY, registeredState)
      yield put(ducks.storeUserFoundOnCookies(registeredState));
      yield put(ducks.sendPasswordToEmailFromUserSuccess());
      yield put(ducks.showAlertSnackbar(tools.PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY));
    }
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(ducks.sendPasswordToEmailFromUserError());
    yield put(
      ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result))
    );
  }
}

function* checkIsAValidApplicant(action) {
  try {
    const { user: { documentType, code } } = action.payload
    const {
      message: { result: applicant },
    } = yield call(
      tools.Get,
      `/user/verify/${code}?documentType=${documentType}`
    )

    /* 
      Conditions
      registered: false
      committeeMember: false
      postulating: false
    */

    if(applicant.registered) {
      const message = 'El usuario ya se encuentra registrado como personero'
      yield put(ducks.checkIsAValidApplicantError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
    else if(applicant.postulating) {
      const message = 'El usuario ya se encuentra registrado como personero'
      yield put(ducks.checkIsAValidApplicantError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
    else if(applicant.committeeMember) {
      const message = 'El usuario es miembro del comité'
      yield put(ducks.checkIsAValidApplicantError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
    else {
      yield put(ducks.checkIsAValidApplicantSuccess({
        ...applicant,
        documentType,
        code
      }))
    }
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.checkIsAValidApplicantError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)));
  }
}

export function* findUserByCodeSaga() {
  yield takeLatest(
    ducks.FIND_USER_BY_CODE_REQUEST,
    findUserByCode
  );
}

export function* sendPasswordToEmailFromUserSaga() {
  yield takeLatest(
    ducks.SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
    sendPasswordToEmailFromUser
  );
}

export function* checkIsAValidApplicantSaga() {
  yield takeLatest(
    ducks.CHECK_IS_A_VALID_APPLICANT_REQUEST,
    checkIsAValidApplicant
  );
}
