import { takeLatest, put, call } from 'redux-saga/effects';

import {
  findUserByCodeSuccess,
  findUserByCodeError,
  sendPasswordToEmailFromUserSuccess,
  sendPasswordToEmailFromUserError,
  showAlertSnackbar,
  storeUserFoundOnCookies,
  FIND_USER_BY_CODE_REQUEST,
  SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
  CHECK_IS_A_VALID_APPLICANT_REQUEST,
  checkIsAValidApplicantSuccess,
  ENROLL_USER_TO_LIST_REQUEST,
  enrollUserToListSuccess,
  checkIsAValidApplicantError,
  enrollUserToListError,
} from 'ducks';
import {
  Get,
  Post,
  Patch,
  createNewAlertSnackbarMessage,
  getCookie,
  setCookie,
  removeCookie,
  USER_KEY,
  USER_SUCCESSFULLY_FOUND,
  PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY,
  PASSWORD_SENT_TO_EMAIL_ERROR
} from 'tools';

function* findUserByCode(action) {
  try {
    const { params, history } = action.payload
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

function* sendPasswordToEmailFromUser(action) {
  try {
    const { user: { data: user, gender } } = action.payload
    const { error } = yield call(
      Patch,
      '/user/notify',
      {
        args: {
          id: user.id,
          gender
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
          registered: true,
          gender
        } 
      }
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

function* checkIsAValidApplicant(action) {
  try {
    const { user: { documentType, code } } = action.payload
    const {
      message: { result: applicant },
    } = yield call(
      Get,
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
      yield put(checkIsAValidApplicantError(message))
      yield put(showAlertSnackbar(createNewAlertSnackbarMessage('error', message)))
    }
    else if(applicant.postulating) {
      const message = 'El usuario ya se encuentra registrado como personero'
      yield put(checkIsAValidApplicantError(message))
      yield put(showAlertSnackbar(createNewAlertSnackbarMessage('error', message)))
    }
    else if(applicant.committeeMember) {
      const message = 'El usuario es miembro del comité'
      yield put(checkIsAValidApplicantError(message))
      yield put(showAlertSnackbar(createNewAlertSnackbarMessage('error', message)))
    }
    else {
      yield put(checkIsAValidApplicantSuccess({
        ...applicant,
        documentType,
        code
      }))
    }
  } catch (error) {
    console.log('aia')
    const { result } = error.response.data.message;
    yield put(checkIsAValidApplicantError(result))
    yield put(showAlertSnackbar(createNewAlertSnackbarMessage('error', result)));
  }
}

function* enrollUserToList(action) {
try {
  const { applicant, estate, lists } = action.payload
  const list = lists[estate]
  const {
    message: { result },
  } = yield call(
    Post,
    `/user/enroll/${applicant.code}?documentType=${applicant.documentType}`,
    {
      args: {
        owner: list.owner,
        id: list.id
      },
    }
  );

  // add the new applicant to the list 
  list.applicants = [
    ...list.applicants,
    result
  ]
  lists[estate] = list
  yield put(enrollUserToListSuccess(lists))
} catch (error) {
  const { result } = error.response.data.message;
  yield put(enrollUserToListError(result))
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

export function* checkIsAValidApplicantSaga() {
  yield takeLatest(
    CHECK_IS_A_VALID_APPLICANT_REQUEST,
    checkIsAValidApplicant
  );
}

export function* enrollUserToListSaga() {
  yield takeLatest(
    ENROLL_USER_TO_LIST_REQUEST,
    enrollUserToList
  )
}
