// success
export const USER_SUCCESSFULLY_FOUND = {
  severity: 'success',
  message: 'El usuario fue encontrado satisfactoriamente',
};

export const USER_SUCCESSFULLY_LOADED = {
  severity: 'success',
  message: 'El usuario fue cargado correctamente',
};

export const PASSWORD_SENT_TO_EMAIL_SUCCESSFULLY = {
  severity: 'success',
  message: 'La contraseña fue enviada a su correo correctamente',
};

// errors
export const ENTER_VALID_UNI_CODE = {
  severity: 'error',
  message: 'Por favor, ingrese un código válido. Ej: 87654321A',
};

export const ENTER_VALID_DNI_CODE = {
  severity: 'error',
  message: 'Por favor, ingrese un documento válido. Ej: 87654321',
};

export const PASSWORD_SENT_TO_EMAIL_ERROR = {
  severity: 'error',
  message: 'Ocurrió un error al intentar enviar la contraseña',
};

// helpers
export const createNewAlertSnackbarMessage = (severity, message) => ({
  severity,
  message,
});
