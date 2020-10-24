// constants
const SHOW_ALERT_SNACKBAR = 'rhoades/alertSnackbar/SHOW_ALERT_SNACKBAR';
const HIDE_ALERT_SNACKBAR = 'rhoades/alertSnackbar/HIDE_ALERT_SNACKBAR';

// default options of the alert snackbar
const defaultOptions = {
  position: { vertical: 'top', horizontal: 'right' },
  duration: 1200,
};

const initialState = {
  open: false,
  severity: '',
  message: '',
  options: defaultOptions,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_SNACKBAR:
      return {
        ...state,
        open: true,
        severity: action.payload.severity,
        message: action.payload.message,
      };
    case HIDE_ALERT_SNACKBAR:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}

// actions
export const showAlertSnackbar = (messageParams) => ({
  type: SHOW_ALERT_SNACKBAR,
  payload: { ...messageParams },
});

export const hideAlertSnackbar = () => ({
  type: HIDE_ALERT_SNACKBAR,
});
