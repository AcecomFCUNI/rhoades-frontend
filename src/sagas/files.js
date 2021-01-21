import { takeLatest, put, call, all } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';

function* saveOneFile(action) {
  try {
    const { file, list } = action.payload
    const bodyFormData = new FormData();
    bodyFormData.append('file', new Blob([file.data], {type: 'application/pdf'}), file.name)

    const {
      message: { result },
    } = yield call(
      tools.Post,
      `/file/upload/${list.id}/${list.owner}`,
      bodyFormData,
      {
        'Content-Type':'multipart/form-data'
      }
    );

    file.id = result.id
    yield put(ducks.saveOneFileSuccess(file));
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', 'El archivo se guardó correctamente')))
  } catch (error) {
    const {
      message: { result }
    } = error.response.data;
    yield put(ducks.saveOneFileError(result));
    yield put(
      ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result))
    );
  }
}

function* getAllFilesFromList(action) {
  try {
    const { lists } = action.payload
    const responses = yield all(Object.values(lists).map((list) => call(tools.Get, `/file/getData/${list.id}/${list.owner}`)))
  
    let files = []
    for(let response of responses) {
      const resFiles = response.message.result
      files = [
        ...files,
        ...resFiles
      ]
    }

    yield put(ducks.getAllFilesFromListSuccess(files))
    yield put(ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('success', 'Documentos obtenidos correctamente')))
  } catch (error) {
    const {
      message: { result }
    } = error.response.data;
    yield put(ducks.getAllFilesFromListError(result));
    yield put(
      ducks.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', result))
    );
  }
}

export function* saveOneFileSaga() {
  yield takeLatest(
    ducks.SAVE_ONE_FILE_REQUEST,
    saveOneFile
  );
}

export function* getAllFilesFromListSaga() {
  yield takeLatest(
    ducks.GET_ALL_FILES_FROM_LIST_REQUEST,
    getAllFilesFromList
  )
}