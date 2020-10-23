import React from 'react';

import { GeneralError } from 'components';
import UnauthorizedSvg from 'assets/images/undraw/unathorized.svg';

const Error401 = () => {
  return (
    <GeneralError
      title="Para acceder primero ingrese su documento de identificación
  "
      subtitle="401 - Unauthorized"
      altImage="unauthorized_svg"
      srcImage={UnauthorizedSvg}
    />
  );
};

export default Error401;
