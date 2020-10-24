export const FIND_USER_BY_CONDITION_AND_CODE_REQUEST =
  'rhoades/user/FIND_USER_BY_CONDITION_AND_CODE_REQUEST';
export const FIND_USER_BY_CONDITION_AND_CODE_SUCCESS =
  'rhoades/user/FIND_USER_BY_CONDITION_AND_CODE_SUCCESS';
export const FIND_USER_BY_CONDITION_AND_CODE_ERROR =
  'rhoades/user/FIND_USER_BY_CONDITION_AND_CODE_ERROR';

export const STORE_FOUND_USER_ON_COOKIES =
  'rhoades/user/STORE_FOUND_USER_ON_COOKIES';

// export const REMOVE_FOUND_USER_FROM_COOKIES =
//   'rhoades/user/REMOVE_FOUND_USER_FROM_COOKIES';

const initialState = {
  searchParams: null,
  loading: false,
  error: '',
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FIND_USER_BY_CONDITION_AND_CODE_REQUEST:
      return {
        ...state,
        searchParams: action.payload.params,
        loading: true,
        error: '',
        data: null,
      };

    case FIND_USER_BY_CONDITION_AND_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.user,
      };

    case FIND_USER_BY_CONDITION_AND_CODE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        data: null,
      };
    case STORE_FOUND_USER_ON_COOKIES:
      return {
        ...state,
        searchParams: action.payload.user.searchParams,
        data: action.payload.user.data,
      };
    // case REMOVE_FOUND_USER_FROM_COOKIES:
    default:
      return state;
  }
}

export const findUserByConditionAndCodeRequest = (params, history) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE_REQUEST,
  payload: { params, history },
});

export const findUserByConditionAndCodeSuccess = (user) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE_SUCCESS,
  payload: { user },
});

export const findUserByConditionAndCodeError = (message) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE_ERROR,
  payload: { message },
});

export const storeUserFoundOnCookies = (user) => ({
  type: STORE_FOUND_USER_ON_COOKIES,
  payload: { user },
});

// export const removeUserFromCookies = () => ({
//   type: REMOVE_FOUND_USER_FROM_COOKIES,
// });
