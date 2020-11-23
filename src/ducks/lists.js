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

const initialState = {
  findLoading: false,
  createLoading: false,
  error: '',
  data: null,
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