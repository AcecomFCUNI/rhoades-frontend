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
  
export const CHECK_IS_A_VALID_APPLICANT_REQUEST = 
  'rhoades/user/CHECK_IS_A_VALID_APPLICANT_REQUEST'
export const CHECK_IS_A_VALID_APPLICANT_SUCCESS = 
  'rhoades/user/CHECK_IS_A_VALID_APPLICANT_SUCCESS'
export const CHECK_IS_A_VALID_APPLICANT_ERROR = 
  'rhoades/user/CHECK_IS_A_VALID_APPLICANT_ERROR'
 
export const CLOSE_APPLICANT_DETAILS_DIALOG = 
  'rhoades/user/CLOSE_APPLICANT_DETAILS_DIALOG'

const initialState = {
  validatingApplicant: {
    loading: false,
    openDialog: false,
    data: null,
    error: ''
  },
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
      return {
        ...state,
        loading: false,
      };
      
    case CHECK_IS_A_VALID_APPLICANT_REQUEST:
      return {
        ...state,
        validatingApplicant: {
          ...state.validatingApplicant,
          loading: true
        }
      }

    case CHECK_IS_A_VALID_APPLICANT_SUCCESS:
      return {
        ...state,
        validatingApplicant: {
          ...state.validatingApplicant,
          loading: false,
          openDialog: true,
          data: action.payload.user
        }
      }

    case CHECK_IS_A_VALID_APPLICANT_ERROR:
      return {
        ...state,
        validatingApplicant: {
          ...state.validatingApplicant,
          loading: false,
          error: action.payload.error
        }
      }

    case CLOSE_APPLICANT_DETAILS_DIALOG:
      return {
        ...state,
        validatingApplicant: {
          ...state.validatingApplicant,
          openDialog: false
        }
      }

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

export const checkIsAValidApplicantRequest = (user) => ({
  type: CHECK_IS_A_VALID_APPLICANT_REQUEST,
  payload: { user }
})

export const checkIsAValidApplicantSuccess = (user) => ({
  type: CHECK_IS_A_VALID_APPLICANT_SUCCESS,
  payload: { user }
})

export const checkIsAValidApplicantError = (error) => ({
  type: CHECK_IS_A_VALID_APPLICANT_ERROR,
  payload: { error }
})

export const closeApplicantDetailsDialog = () => ({
  type: CLOSE_APPLICANT_DETAILS_DIALOG
})