import { takeLatest, put, call } from 'redux-saga/effects';

import { findListsByUserIdSuccess,
  createListByUserIdAndTypeError,
  createListByUserIdAndTypeSuccess,
  CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST,
  FIND_LISTS_BY_USER_ID_REQUEST,
  showAlertSnackbar,
  findListsByUserIdError
 } from 'ducks'

import { Get, Post, LIST_WAS_CREATED_SUCCESSFULLY, LIST_WAS_CREATED_WITH_ERROR } from 'tools';

function* findListsByUserId({
  payload: {
    userId
  }
}) {
  try {
    const { message: { result } } = yield call(Get, `/list/getListsOfUser/${userId}`)
    yield put(findListsByUserIdSuccess(result))
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(findListsByUserIdError(result))
  }
}

function* createListByUserIdAndType({
  payload: {
    id, estate, type, faculty
  }
}) {
  try {
    const { message: { result } } = yield call(Post, `/list/createList?faculty=${faculty}`, {
      args: {
        owner: id,
        type
      }
    })
    yield put(createListByUserIdAndTypeSuccess(estate, result))
    yield put(showAlertSnackbar(LIST_WAS_CREATED_SUCCESSFULLY))
  } catch (error) {
    const { message: { result } } = error.response.data;
    yield put(createListByUserIdAndTypeError(result))
    yield put(showAlertSnackbar(LIST_WAS_CREATED_WITH_ERROR))
  }
}

export function* findListsByUserIdSaga() {
  yield takeLatest(
    FIND_LISTS_BY_USER_ID_REQUEST,
    findListsByUserId
  );
}

export function* createListByUserIdAndTypeSaga() {
  yield takeLatest(
    CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST,
    createListByUserIdAndType
  );
}