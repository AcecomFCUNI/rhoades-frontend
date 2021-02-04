import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks'
import * as tools from 'tools';

function* findListsByUserId(action) {
  try {
    const { userId } = action.payload
    const { message: { result } } = yield call(tools.Get, `/list/getListsOfUser/${userId}`)
    yield put(ducks.findListsByUserIdSuccess(result))
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(ducks.findListsByUserIdError(result))
  }
}

function* createListByUserIdAndType(action) {
  try {
    const { id, estate, type, faculty } = action.payload
    const { message: { result } } = yield call(tools.Post, `/list/createList?faculty=${faculty}`, {
      args: {
        owner: id,
        type
      }
    })
    yield put(ducks.createListByUserIdAndTypeSuccess(estate, result))
    yield put(ducks.showAlertSnackbar(tools.LIST_WAS_CREATED_SUCCESSFULLY))
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(ducks.createListByUserIdAndTypeError(result))
    yield put(ducks.showAlertSnackbar(tools.LIST_WAS_CREATED_WITH_ERROR))
  }
}


function* enrollUserToList(action) {
  try {
    const { applicant, estate, lists } = action.payload
    const list = lists[estate]
    const {
      message: { result },
    } = yield call(
      tools.Post,
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
    yield put(ducks.enrollUserToListSuccess(lists))
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.enrollUserToListError(result))
    yield put(
      ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result))
    );
  }
}

export function* removeUserFromList(action) {
  try {
    const { applicant, condition, lists } = action.payload
    const list = lists[condition]
    const response = yield call(
      tools.Patch,
      `/list/removeCandidate/${applicant.id}`,
      {
        args: {
          owner: list.owner,
          id: list.id
        },
      }
    );
    
    if(!response.error) {
      // return new lists removing the applicant
      list.applicants = list.applicants.filter(currentApplicant => currentApplicant.id !== applicant.id)
      lists[condition] = list
      yield put(ducks.removeUserFromListSuccess(lists))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', response.message.result)))
    }
    else {
      // return the same lists without changes
      const message = 'Ocurrió un error al intentar eliminar la persona de su lista'
      yield put(ducks.removeUserFromListError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.removeUserFromListError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)))
  }
}

export function* finishRegistrationList(action) {
  try {
    const { lists, condition } = action.payload
    const list = lists[condition]
    const response = yield call(
      tools.Patch,
      '/list/finishRegistration',
      {
        args: {
          owner: list.owner,
          id: list.id
        },
      }
    );

    if(!response.error) {
      // return new lists setting closed
      list.closed = true
      lists[condition] = list
      yield put(ducks.finishRegistrationListSuccess(lists))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', response.message.result)))
    }
    else {
      // return the same lists without changes
      const message = 'Ocurrió un error al intentar finalizar la lista'
      yield put(ducks.finishRegistrationListError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.finishRegistrationListError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)))
  }
}

export function* deleteList(action) {
  try {
    const { lists, condition } = action.payload
    const list = lists[condition]
    const response = yield call(
      tools.Patch,
      '/list/delete',
      {
        args: {
          owner: list.owner,
          id: list.id
        },
      }
    );

    if(!response.error) {
      // return new lists setting closed
      delete lists[condition]
      yield put(ducks.deleteListSuccess(lists))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', response.message.result)))
    }
    else {
      // return the same lists without changes
      const message = 'Ocurrió un error al intentar eliminar la lista'
      yield put(ducks.deleteListError(message))
      yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', message)))
    }
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.deleteListError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)))
  }
}

function* getListForAdmin(action) {
  try {
    const { queryParams } = action.payload
    const queryParamsString = '?' + Object.keys(queryParams).map(paramKey => `${paramKey}=${queryParams[paramKey]}`).join('&')
    const response = yield call(
      tools.Get,
      `/list/filter${queryParamsString}`
    );
    const result = response.message.result
    yield put(ducks.getListsForAdminSuccess(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', 'Listas obtenidas correctamente')))
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.getListsForAdminError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)))
  }
}

function* reviewListForAdmin(action) {
  try {
    const { adminId, status, bodyRequest } = action.payload
    const response = yield call(
      tools.Patch,
      `/list/review/${adminId}/${status}`,
      bodyRequest
    );
    yield put(ducks.reviewListForAdminSuccess(response.message))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', response.message)))
  } catch (error) {
    const { result } = error.response.data.message;
    yield put(ducks.reviewListForAdminError(result))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result)))
  }
}

export function* findListsByUserIdSaga() {
  yield takeLatest(
    ducks.FIND_LISTS_BY_USER_ID_REQUEST,
    findListsByUserId
  );
}

export function* createListByUserIdAndTypeSaga() {
  yield takeLatest(
    ducks.CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST,
    createListByUserIdAndType
  );
}

export function* enrollUserToListSaga() {
  yield takeLatest(
    ducks.ENROLL_USER_TO_LIST_REQUEST,
    enrollUserToList
  )
}

export function* removeUserFromListSaga() {
  yield takeLatest(
    ducks.REMOVE_USER_FROM_LIST_REQUEST,
    removeUserFromList
  )
}

export function* finishRegistrationListSaga() {
  yield takeLatest(
    ducks.FINISH_REGISTRATION_LIST_REQUEST,
    finishRegistrationList
  )
}

export function* deleteListSaga() {
  yield takeLatest(
    ducks.DELETE_LIST_REQUEST,
    deleteList
  )
}

export function* getListsForAdminSaga() {
  yield takeLatest(
    ducks.GET_LISTS_FOR_ADMIN_REQUEST,
    getListForAdmin
  )
}

export function* reviewListForAdminSaga() {
  yield takeLatest(
    ducks.REVIEW_LIST_FOR_ADMIN_REQUEST,
    reviewListForAdmin
  )
}