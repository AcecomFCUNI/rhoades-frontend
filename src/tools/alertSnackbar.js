const success = 'success';
const error = 'error';

// success
export const USER_SUCCESSFULLY_FOUND = {
  severity: success,
  message: 'El usuario fue encontrado satisfactoriamente',
};

export const USER_SUCCESSFULLY_LOADED = {
  severity: success,
  message: 'El usuario fue cargado correctamente',
};

export const PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY = {
  severity: success,
  message: 'La contraseña fue enviada a su correo correctamente',
};

export const LOGIN_SUCCESSFULLY = {
  severity: success,
  message: 'Se inició sesión correctamente',
};

export const LIST_WAS_CREATED_SUCCESSFULLY = {
  severity: success,
  message: 'La lista fue creada correctamente',
};

// errors
export const ENTER_VALID_UNI_CODE = {
  severity: error,
  message: 'Por favor, ingrese un código válido. Ej: 87654321A',
};

export const ENTER_VALID_DNI_CODE = {
  severity: error,
  message: 'Por favor, ingrese un documento válido. Ej: 87654321',
};

export const PASSWORD_SENT_TO_EMAIL_ERROR = {
  severity: error,
  message: 'Ocurrió un error al intentar enviar la contraseña',
};

export const LOGIN_WITH_WRONG_PASSWORD = {
  severity: error,
  message: 'La contraseña ingresada es incorrecta',
};

export const ENTER_WRONG_CREDENTIALS = {
  severity: error,
  message: 'Ingrese unas credenciales válidas',
};

export const LOGOUT_WITH_ERROR = {
  severity: error,
  message: 'Ocurrió un error al intentar salir de su cuenta',
};

export const LIST_WAS_CREATED_WITH_ERROR = {
  severity: success,
  message: 'Ocurrió un error al intentar crear la lista',
};

// helpers
export const createNewAlertSnackbarMessage = (severity, message) => ({
  severity,
  message,
});
