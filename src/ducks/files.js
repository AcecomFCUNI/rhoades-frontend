export const GET_ALL_FILES_FROM_LIST_REQUEST =
  'rhoades/files/GET_ALL_FILES_FROM_LIST_REQUEST'
export const GET_ALL_FILES_FROM_LIST_SUCCESS =
  'rhoades/files/GET_ALL_FILES_FROM_LIST_SUCCESS'
export const GET_ALL_FILES_FROM_LIST_ERROR =
  'rhoades/files/GET_ALL_FILES_FROM_LIST_ERROR'

export const OPEN_UPLOAD_FILES_DIALOG =
  'rhoades/files/OPEN_UPLOAD_FILES_DIALOG'
export const CLOSE_UPLOAD_FILES_DIALOG =
  'rhoades/files/CLOSE_UPLOAD_FILES_DIALOG'

export const UPLOAD_ONE_FILE =
  'rhoades/files/UPLOAD_ONE_FILE'
export const REMOVE_ONE_FILE =
  'rhoades/files/REMOVE_ONE_FILE'

export const SAVE_ONE_FILE_REQUEST =
  'rhoades/files/SAVE_ONE_FILE_REQUEST'
export const SAVE_ONE_FILE_SUCCESS =
  'rhoades/files/SAVE_ONE_FILE_SUCCESS'
export const SAVE_ONE_FILE_ERROR =
  'thoades/files/SAVE_ONE_FILE_ERROR'

export const DELETE_ONE_FILE_REQUEST =
  'rhoades/files/DELETE_ONE_FILE_REQUEST'
export const DELETE_ONE_FILE_SUCCESS =
  'rhoades/files/DELETE_ONE_FILE_SUCCESS'
export const DELETE_ONE_FILE_ERROR =
  'rhoades/files/DELETE_ONE_FILE_ERROR'

const initialState = {
  addLoading: false,
  getLoading: false,
  deleteLoading: false,
  openDialog: false,
  savedFiles: [],
  uploadedFiles: [],
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case OPEN_UPLOAD_FILES_DIALOG:
      return {
        ...state,
        openDialog: true
      }

    case CLOSE_UPLOAD_FILES_DIALOG:
      return {
        ...state,
        openDialog: false
      }

    case UPLOAD_ONE_FILE:
      return {
        ...state,
        uploadedFiles: [
          action.payload.file
        ]
      }
    case REMOVE_ONE_FILE:
      return {
        ...state,
        // just one file, I just set an empty array
        uploadedFiles: []
      }
    case SAVE_ONE_FILE_REQUEST:
      return {
        ...state,
        addLoading: true
      }
    case SAVE_ONE_FILE_SUCCESS:
      return {
        ...state,
        addLoading: false,
        savedFiles: [
          ...state.savedFiles,
          action.payload.file
        ],
        uploadedFiles: []
      }
    case SAVE_ONE_FILE_ERROR:
      return {
        ...state,
        addLoading: false,
        error: action.payload.error
      }
    case GET_ALL_FILES_FROM_LIST_REQUEST:
      return {
        ...state,
        getLoading: true
      }
    case GET_ALL_FILES_FROM_LIST_SUCCESS:
      return {
        ...state,
        savedFiles: action.payload.files,
        getLoading: false
      }
    case GET_ALL_FILES_FROM_LIST_ERROR:
      return {
        ...state,
        error: action.payload.error,
        getLoading: false
      }
    case DELETE_ONE_FILE_REQUEST:
      return {
        ...state,
        deleteLoading: true
      }
    case DELETE_ONE_FILE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        savedFiles: state.savedFiles.filter(file => file._id !== action.payload.fileId)
      }
    case DELETE_ONE_FILE_ERROR:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export const openUploadFilesDialog = () => ({
  type: OPEN_UPLOAD_FILES_DIALOG
})

export const closeUploadFilesDialog = () => ({
  type: CLOSE_UPLOAD_FILES_DIALOG
})

export const saveOneFileRequest = (file, list) => ({
  type: SAVE_ONE_FILE_REQUEST,
  payload: { file, list }
})

export const saveOneFileSuccess = (file) => ({
  type: SAVE_ONE_FILE_SUCCESS,
  payload: { file }
})

export const saveOneFileError = (error) => ({
  type: SAVE_ONE_FILE_ERROR,
  payload: { error }
})

export const uploadOneFile = (file) => ({
  type: UPLOAD_ONE_FILE,
  payload: { file }
})

export const removeOneFile = () => ({
  type: REMOVE_ONE_FILE
})

export const getAllFilesFromListRequest = (lists) => ({
  type: GET_ALL_FILES_FROM_LIST_REQUEST,
  payload: { lists }
})

export const getAllFilesFromListSuccess = (files) => ({
  type: GET_ALL_FILES_FROM_LIST_SUCCESS,
  payload: { files }
})

export const getAllFilesFromListError = (error) => ({
  type: GET_ALL_FILES_FROM_LIST_ERROR,
  payload: { error }
})

export const deleteOneFileRequest = (file, ownerId) => ({
  type: DELETE_ONE_FILE_REQUEST,
  payload: { file, ownerId }
})

export const deleteOneFileSuccess = (fileId) => ({
  type: DELETE_ONE_FILE_SUCCESS,
  payload: { fileId }
})

export const deleteOneFileError = (error) => ({
  type: DELETE_ONE_FILE_ERROR,
  payload: { error }
})