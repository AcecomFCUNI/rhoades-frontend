import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <CircularProgress
        size={55}
        style={{ margin: '0 auto' }}
        color="inherit"
      />
    </div>
  );
};

export default Spinner;
