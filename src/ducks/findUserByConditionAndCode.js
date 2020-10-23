// findUserByConditionAndCode

export const FIND_USER_BY_CONDITION_AND_CODE = {
  REQUEST:
    'rhoades/findUserByConditionAndCode/REQUEST_FIND_USER_BY_CONDITION_AND_CODE',
  SUCCESS:
    'rhoades/findUserByConditionAndCode/SUCCESS_FIND_USER_BY_CONDITION_AND_CODE',
  ERROR:
    'rhoades/findUserByConditionAndCode/ERROR_FIND_USER_BY_CONDITION_AND_CODE',
};

const initialState = {
  searchParams: null,
  loading: false,
  error: '',
  data: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FIND_USER_BY_CONDITION_AND_CODE.REQUEST:
      return {
        ...state,
        searchParams: action.payload.params,
        loading: true,
        error: '',
        data: null,
      };

    case FIND_USER_BY_CONDITION_AND_CODE.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data: action.payload.user,
      };

    case FIND_USER_BY_CONDITION_AND_CODE.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
}

export const requestFindUserByConditionAndCode = (params, history) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE.REQUEST,
  payload: { params, history },
});

export const successFindUserByConditionAndCode = (user) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE.SUCCESS,
  payload: { user },
});

export const errorFindUserByConditionAndCode = (message) => ({
  type: FIND_USER_BY_CONDITION_AND_CODE.ERROR,
  payload: { message },
});
