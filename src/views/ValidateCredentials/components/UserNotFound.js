import React from 'react';

import { GeneralError } from 'components';
import RedirectToSearchUserSvg from 'assets/images/undraw/redirect_to_search_user.svg';

const UserNotFound = () => {
  return (
    <GeneralError
      title="Para acceder primero ingrese su documento de identificación"
      subtitle=""
      altImage="redirect_to_search_user_svg"
      srcImage={RedirectToSearchUserSvg}
    />
  );
};

export default UserNotFound;
