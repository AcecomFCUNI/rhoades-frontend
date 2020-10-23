// const SHOW_ALERT_SNACKBAR = 'rhoades/alertSnackbar/SHOW_ALERT_SNACKBAR';
// const HIDE_ALERT_SNACKBAR = 'rhoades/alertSnackbar/HIDE_ALERT_SNACKBAR';
export const ALERT_SNACKBAR = {
  SHOW: 'rhoades/alertSnackbar/SHOW_ALERT_SNACKBAR',
  HIDE: 'rhoades/alertSnackbar/HIDE_ALERT_SNACKBAR',
};

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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALERT_SNACKBAR.SHOW:
      return {
        ...state,
        open: true,
        severity: action.payload.severity,
        message: action.payload.message,
        options: action.payload.options,
      };
    case ALERT_SNACKBAR.HIDE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}

export const showAlertSnackbar = (
  severity,
  message,
  options = defaultOptions
) => ({
  type: ALERT_SNACKBAR.SHOW,
  payload: { severity, message, options },
});

export const hideAlertSnackbar = () => ({
  type: ALERT_SNACKBAR.HIDE,
});
