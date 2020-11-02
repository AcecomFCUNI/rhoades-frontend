import React from 'react';

import { GeneralError } from 'components';
import NotFoundSvg from 'assets/images/undraw/not_found.svg';

const Error404 = () => {
  return (
    <GeneralError
      title="Lo sentimos, no pudimos encontrar la página"
      subtitle="404 - Not Found"
      altImage="not_found_svg"
      srcImage={NotFoundSvg}
    />
  );
};

export default Error404;
