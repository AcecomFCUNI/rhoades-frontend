import React from 'react';
import { useHistory } from 'react-router-dom';

const Error401 = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <p>401 - Unauthorized</p>
      <button onClick={() => history.push('/')}>Volver al inicio</button>
    </React.Fragment>
  );
};

export default Error401;
