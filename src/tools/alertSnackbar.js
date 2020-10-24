// success
export const USER_SUCCESSFULLY_FOUND = {
  severity: 'success',
  message: 'El usuario fue encontrado satisfactoriamente',
};

export const USER_SUCCESSFULLY_LOADED = {
  severity: 'success',
  message: 'El usuario fue cargado correctamente',
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

// helpers
export const createNewAlertSnackbarMessage = (severity, message) => ({
  severity,
  message,
});
