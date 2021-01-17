export const UPLOAD_ONE_FILE =
  'rhoades/files/UPLOAD_ONE_FILE'
export const REMOVE_ONE_UPLOADED_FILE =
  'rhoades/files/REMOVE_ONE_UPLOADED_FILE'

export const SAVE_ONE_FILE_REQUEST =
  'rhoades/files/SAVE_ONE_FILE_REQUEST'
export const SAVE_ONE_FILE_SUCCESS =
  'rhoades/files/SAVE_ONE_FILE_SUCCESS'
export const SAVE_ONE_FILE_ERROR =
  'thoades/files/SAVE_ONE_FILE_ERROR'

const initialState = {
  loading: false,
  savedFiles: [],
  uploadedFiles: [],
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case UPLOAD_ONE_FILE:
      return {
        ...state,
        uploadedFiles: [
          ...state.uploadedFiles,
          action.payload.file
        ]
      }
    case REMOVE_ONE_UPLOADED_FILE:
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(uploadedFile => uploadedFile.id !== action.payload.file.id)
      }
    case SAVE_ONE_FILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SAVE_ONE_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        savedFiles: action.payload.savedFiles
      }
    case SAVE_ONE_FILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

export const saveOneFileRequest = (file) => ({
  type: SAVE_ONE_FILE_REQUEST,
  payload: { file }
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

export const removeOneUploadedFile = (file) => ({
  type: REMOVE_ONE_UPLOADED_FILE,
  payload: { file }
})