import React from 'react';
import { useHistory } from 'react-router-dom';

const Error404 = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <p>404 - Not Found</p>
      <button onClick={() => history.push('/')}>Volver al inicio</button>
    </React.Fragment>
  );
};

export default Error404;
