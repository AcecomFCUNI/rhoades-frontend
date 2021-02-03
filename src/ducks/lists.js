export const FIND_LISTS_BY_USER_ID_REQUEST =
  'rhoades/lists/FIND_LISTS_BY_USER_ID_REQUEST';
export const FIND_LISTS_BY_USER_ID_SUCCESS =
  'rhoades/lists/FIND_LISTS_BY_USER_ID_SUCCESS';
export const FIND_LISTS_BY_USER_ID_ERROR =
  'rhoades/lists/FIND_LISTS_BY_USER_ID_ERROR';

export const CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST =
  'rhoades/lists/CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST';
export const CREATE_LIST_BY_USER_ID_AND_TYPE_SUCCESS =
  'rhoades/lists/CREATE_LIST_BY_USER_ID_AND_TYPE_SUCCESS';
export const CREATE_LIST_BY_USER_ID_AND_TYPE_ERROR =
  'rhoades/lists/CREATE_LIST_BY_USER_ID_AND_TYPE_ERROR';

export const ENROLL_USER_TO_LIST_REQUEST =
  'rhoades/list/ENROLL_USER_TO_LIST_REQUEST';
export const ENROLL_USER_TO_LIST_SUCCESS =
  'rhoades/list/ENROLL_USER_TO_LIST_SUCCESS';
export const ENROLL_USER_TO_LIST_ERROR =
  'rhoades/list/ENROLL_USER_TO_LIST_ERROR';

export const REMOVE_USER_FROM_LIST_REQUEST =
  'rhoades/list/REMOVE_USER_FROM_LIST_REQUEST'
export const REMOVE_USER_FROM_LIST_SUCCESS =
  'rhoades/list/REMOVE_USER_FROM_LIST_SUCCESS'
export const REMOVE_USER_FROM_LIST_ERROR =
  'rhoades/list/REMOVE_USER_FROM_LIST_ERROR'

export const OPEN_REMOVE_USER_FROM_LIST_DIALOG =
  'rhoades/list/OPEN_REMOVE_USER_FROM_LIST_DIALOG'
export const CLOSE_REMOVE_USER_FROM_LIST_DIALOG =
  'rhoades/list/CLOSE_REMOVE_USER_FROM_LIST_DIALOG'

export const OPEN_FINISH_REGISTRATION_LIST_DIALOG =
  'rhoades/list/OPEN_FINISH_REGISTRATION_LIST_DIALOG'
export const CLOSE_FINISH_REGISTRATION_LIST_DIALOG =
  'rhoades/list/CLOSE_FINISH_REGISTRATION_LIST_DIALOG'

export const FINISH_REGISTRATION_LIST_REQUEST =
  'rhoades/list/FINISH_REGISTRATION_LIST_REQUEST'
export const FINISH_REGISTRATION_LIST_SUCCESS =
  'rhoades/list/FINISH_REGISTRATION_LIST_SUCCESS'
export const FINISH_REGISTRATION_LIST_ERROR =
  'rhoades/list/FINISH_REGISTRATION_LIST_ERROR'

export const OPEN_DELETE_LIST_DIALOG =
  'rhoades/list/OPEN_DELETE_LIST_DIALOG'
export const CLOSE_DELETE_LIST_DIALOG =
  'rhoades/list/CLOSE_DELETE_LIST_DIALOG'

export const DELETE_LIST_REQUEST =
  'rhoades/list/DELETE_LIST_REQUEST'
export const DELETE_LIST_SUCCESS =
  'rhoades/list/DELETE_LIST_SUCCESS'
export const DELETE_LIST_ERROR =
  'rhoades/list/DELETE_LIST_ERROR'

// ADMIN CONSTANTS
export const GET_LISTS_FOR_ADMIN_REQUEST =
  'rhoades/list/GET_LISTS_FOR_ADMIN_REQUEST'
export const GET_LISTS_FOR_ADMIN_SUCCESS =
  'rhoades/list/GET_LISTS_FOR_ADMIN_SUCCESS'
export const GET_LISTS_FOR_ADMIN_ERROR =
  'rhoades/list/GET_LISTS_FOR_ADMIN_ERROR'

const initialState = {
  findLoading: false,
  createLoading: false,
  addLoading: false,
  data: null,
  error: '',
  removeUser: {
    openDialog: false,
    loading: false,
    data: null,
    error: null
  },
  finishList: {
    openDialog: false,
    loading: false,
    error: null
  },
  deleteList: {
    openDialog: false,
    loading: false,
    error: null
  },
  adminLists: {
    loading: false,
    data: [],
    error: null
  }
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FIND_LISTS_BY_USER_ID_REQUEST:
      return {
        ...state,
        findLoading: true,
      }
    case FIND_LISTS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        findLoading: false,
        data: action.payload.lists
      }
    case FIND_LISTS_BY_USER_ID_ERROR:
      return {
        ...state,
        findLoading: false,
        error: action.payload.error,
      }
    case CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST:
      return {
        ...state,
        createLoading: true,
      }
    case CREATE_LIST_BY_USER_ID_AND_TYPE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        data: {
          ...state.data,
          [action.payload.estate]: action.payload.list
        }
      }
    case CREATE_LIST_BY_USER_ID_AND_TYPE_ERROR:
      return {
        ...state,
        createLoading: false,
        error: action.payload.error,
      }
    case ENROLL_USER_TO_LIST_REQUEST:
      return {
        ...state,
        addLoading: true
      }
    case ENROLL_USER_TO_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload.lists,
        addLoading: false
      }
    case ENROLL_USER_TO_LIST_ERROR:
      return {
        ...state,
        error: action.payload.error,
        addLoading: false
      }
    case OPEN_REMOVE_USER_FROM_LIST_DIALOG:
      return {
        ...state,
        removeUser: {
          ...state.removeUser,
          openDialog: true,
          data: action.payload.applicant
        }
      }
    case CLOSE_REMOVE_USER_FROM_LIST_DIALOG:
      return {
        ...state,
        removeUser: {
          ...state.removeUser,
          openDialog: false
        }
      }
    case REMOVE_USER_FROM_LIST_REQUEST:
      return {
        ...state,
        removeUser: {
          ...state.removeUser,
          loading: true
        }
      }
    case REMOVE_USER_FROM_LIST_SUCCESS:
      return {
        ...state,
        removeUser: {
          ...state.removeUser,
          loading: false,
          data: null
        },
        data: action.payload.lists
      }
    case REMOVE_USER_FROM_LIST_ERROR: 
      return {
        ...state,
        removeUser: {
          ...state.removeUser,
          loading: false,
          error: action.payload.error
        }
    }
    case OPEN_FINISH_REGISTRATION_LIST_DIALOG:
      return {
        ...state,
        finishList: {
          ...state.finishList,
          openDialog: true
        }
      }
    case CLOSE_FINISH_REGISTRATION_LIST_DIALOG:
      return {
        ...state,
        finishList: {
          ...state.finishList,
          openDialog: false
        }
      }
    case FINISH_REGISTRATION_LIST_REQUEST:
      return {
        ...state,
        finishList: {
          ...state.finishList,
          loading: true
        }
      }
    case FINISH_REGISTRATION_LIST_SUCCESS:
      return {
        ...state,
        finishList: {
          ...state.finishList,
          loading: false
        },
        data: action.payload.lists
      }
    case FINISH_REGISTRATION_LIST_ERROR:
      return {
        ...state,
        finishList: {
          ...state.finishList,
          loading: false,
          error: action.payload.error
        },
      }
    case OPEN_DELETE_LIST_DIALOG:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          openDialog: true
        }
      }
    case CLOSE_DELETE_LIST_DIALOG:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          openDialog: false
        }
      }
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          loading: true
        }
      }
    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          loading: false
        },
        data: action.payload.lists
      }
    case DELETE_LIST_ERROR:
      return {
        ...state,
        deleteList: {
          ...state.deleteList,
          loading: false,
          error: action.payload.error
        }
      }
    case GET_LISTS_FOR_ADMIN_REQUEST:
      return {
        ...state,
        adminLists: {
          ...state.adminLists,
          loading: true
        }
      }
    case GET_LISTS_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        adminLists: {
          ...state.adminLists,
          loading: false,
          data: action.payload.lists
        }
      }
    case GET_LISTS_FOR_ADMIN_ERROR:
      return {
        ...state,
        adminLists: {
          ...state.adminLists,
          loading: false,
          error: action.payload.error
        }
      }
    default: 
      return state
  }
}

export const findListsByUserIdRequest = (userId) => ({
  type: FIND_LISTS_BY_USER_ID_REQUEST,
  payload: { userId }
})

export const findListsByUserIdSuccess = (lists) => ({
  type: FIND_LISTS_BY_USER_ID_SUCCESS,
  payload: { lists }
})

export const findListsByUserIdError = (error) => ({
  type: FIND_LISTS_BY_USER_ID_ERROR,
  payload: { error }
})

export const createListByUserIdAndTypeRequest = (id, estate, type, faculty) => ({
  type: CREATE_LIST_BY_USER_ID_AND_TYPE_REQUEST,
  payload: { id, estate, type, faculty }
})

export const createListByUserIdAndTypeSuccess = (estate, list) => ({
  type: CREATE_LIST_BY_USER_ID_AND_TYPE_SUCCESS,
  payload: { estate, list }
})

export const createListByUserIdAndTypeError = (error) => ({
  type: CREATE_LIST_BY_USER_ID_AND_TYPE_ERROR,
  payload: { error }
})

export const enrollUserToListRequest = (applicant, estate, lists) => ({
  type: ENROLL_USER_TO_LIST_REQUEST,
  payload: { applicant, estate, lists }
})

export const enrollUserToListSuccess = (lists) => ({
  type: ENROLL_USER_TO_LIST_SUCCESS,
  payload: { lists }
})

export const enrollUserToListError = (error) => ({
  type: ENROLL_USER_TO_LIST_ERROR,
  payload: { error }
})

export const openRemoveUserFromListDialog = (applicant) => ({
  type: OPEN_REMOVE_USER_FROM_LIST_DIALOG,
  payload: { applicant }
})

export const closeRemoveUserFromListDialog = () => ({
  type: CLOSE_REMOVE_USER_FROM_LIST_DIALOG
})

export const removeUserFromListRequest = (applicant, condition, lists) => ({
  type: REMOVE_USER_FROM_LIST_REQUEST,
  payload: { applicant, condition, lists }
})

export const removeUserFromListSuccess = (lists) => ({
  type: REMOVE_USER_FROM_LIST_SUCCESS,
  payload: { lists }
})

export const removeUserFromListError = (error) => ({
  type: REMOVE_USER_FROM_LIST_ERROR,
  payload: { error }
})

export const openFinishRegistrationListDialog = () => ({
  type: OPEN_FINISH_REGISTRATION_LIST_DIALOG
})

export const closeFinishRegistrationListDialog = () => ({
  type: CLOSE_FINISH_REGISTRATION_LIST_DIALOG
})

export const finishRegistrationListRequest = (lists, condition) => ({
  type: FINISH_REGISTRATION_LIST_REQUEST,
  payload: { lists, condition }
})

export const finishRegistrationListSuccess = (lists) => ({
  type: FINISH_REGISTRATION_LIST_SUCCESS,
  payload: { lists }
})

export const finishRegistrationListError = (error) => ({
  type: FINISH_REGISTRATION_LIST_ERROR,
  payload: { error }
})

export const openDeleteListDialog = () => ({
  type: OPEN_DELETE_LIST_DIALOG
})

export const closeDeleteListDialog = () => ({
  type: CLOSE_DELETE_LIST_DIALOG
})

export const deleteListRequest = (lists, condition) => ({
  type: DELETE_LIST_REQUEST,
  payload: { lists, condition }
})

export const deleteListSuccess = (lists) => ({
  type: DELETE_LIST_SUCCESS,
  payload: { lists }
})

export const deleteListError = (error) => ({
  type: DELETE_LIST_ERROR,
  payload: { error }
})

export const getListsForAdminRequest = (queryParams) => ({
  type: GET_LISTS_FOR_ADMIN_REQUEST,
  payload: { queryParams }
})

export const getListsForAdminSuccess = (lists) => ({
  type: GET_LISTS_FOR_ADMIN_SUCCESS,
  payload: { lists }
})

export const getListsForAdminError = (error) => ({
  type: GET_LISTS_FOR_ADMIN_ERROR,
  payload: { error }
})