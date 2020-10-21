import React from 'react';

import { Button } from '@material-ui/core';

const TopBar = () => {
  return (
    <header
      style={{
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <nav>
        <Button>Ingresar</Button>
      </nav>
    </header>
  );
};

export default TopBar;
