const SHOW_ALERT_SNACKBAR = 'rhoades/alertSnackbar/SHOW_ALERT_SNACKBAR';
const HIDE_ALERT_SNACKBAR = 'rhoades/alertSnackbar/HIDE_ALERT_SNACKBAR';

const initialState = {
  open: false,
  severity: '',
  message: '',
  options: {},
};

// default options of the alert snackbar
const defaultOptions = {
  position: { vertical: 'top', horizontal: 'right' },
  duration: 1200,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_SNACKBAR:
      return {
        ...state,
        open: true,
        severity: action.payload.severity,
        message: action.payload.message,
        options: action.payload.options,
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

export const showAlertSnackbar = (
  severity = '',
  message = '',
  options = defaultOptions
) => ({
  type: SHOW_ALERT_SNACKBAR,
  payload: { severity, message, options },
});

export const hideAlertSnackbar = () => ({
  type: HIDE_ALERT_SNACKBAR,
});
