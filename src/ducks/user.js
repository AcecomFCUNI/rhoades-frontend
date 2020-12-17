export const FIND_USER_BY_CODE_REQUEST =
  'rhoades/user/FIND_USER_BY_CODE_REQUEST';
export const FIND_USER_BY_CODE_SUCCESS =
  'rhoades/user/FIND_USER_BY_CODE_SUCCESS';
export const FIND_USER_BY_CODE_ERROR =
  'rhoades/user/FIND_USER_BY_CODE_ERROR';

export const STORE_FOUND_USER_ON_COOKIES =
  'rhoades/user/STORE_FOUND_USER_ON_COOKIES';

export const SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST =
  'rhoades/user/SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST';
export const SEND_PASSWORD_TO_EMAIL_FROM_USER_SUCCESS =
  'rhoades/user/SEND_PASSWORD_TO_EMAIL_FROM_USER_SUCCESS';
export const SEND_PASSWORD_TO_EMAIL_FROM_USER_ERROR =
  'rhoades/user/SEND_PASSWORD_TO_EMAIL_FROM_USER_ERROR';

export const ENROLL_USER_TO_LIST_REQUEST =
  'rhoades/user/ENROLL_USER_TO_LIST_REQUEST';
export const ENROLL_USER_TO_LIST_SUCCESS =
  'rhoades/user/ENROLL_USER_TO_LIST_SUCCESS';
export const ENROLL_USER_TO_LIST_ERROR =
  'rhoades/user/ENROLL_USER_TO_LIST_ERROR';

const initialState = {
  searchParams: null,
  loading: false,
  error: '',
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FIND_USER_BY_CODE_REQUEST:
      return {
        ...state,
        searchParams: action.payload.params,
        loading: true,
        error: '',
        data: null,
      };

    case FIND_USER_BY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.user,
      };

    case FIND_USER_BY_CODE_ERROR:
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
    case SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_PASSWORD_TO_EMAIL_FROM_USER_SUCCESS:
    case SEND_PASSWORD_TO_EMAIL_FROM_USER_ERROR:
    case ENROLL_USER_TO_LIST_SUCCESS:
    case ENROLL_USER_TO_LIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export const findUserByCodeRequest = (params, history) => ({
  type: FIND_USER_BY_CODE_REQUEST,
  payload: { params, history },
});

export const findUserByCodeSuccess = (user) => ({
  type: FIND_USER_BY_CODE_SUCCESS,
  payload: { user },
});

export const findUserByCodeError = (message) => ({
  type: FIND_USER_BY_CODE_ERROR,
  payload: { message },
});

export const storeUserFoundOnCookies = (user) => ({
  type: STORE_FOUND_USER_ON_COOKIES,
  payload: { user },
});

export const sendPasswordToEmailFromUserRequest = (user) => ({
  type: SEND_PASSWORD_TO_EMAIL_FROM_USER_REQUEST,
  payload: { user },
});

export const sendPasswordToEmailFromUserSuccess = () => ({
  type: SEND_PASSWORD_TO_EMAIL_FROM_USER_SUCCESS,
});

export const sendPasswordToEmailFromUserError = () => ({
  type: SEND_PASSWORD_TO_EMAIL_FROM_USER_ERROR,
});

export const enrollUserToListRequest = (user) => ({
  type: ENROLL_USER_TO_LIST_REQUEST,
  payload: { user }
})

export const enrollUserToListSuccess = () => ({
  type: ENROLL_USER_TO_LIST_SUCCESS
})

export const enrollUserToListError = () => ({
  type: ENROLL_USER_TO_LIST_ERROR
})