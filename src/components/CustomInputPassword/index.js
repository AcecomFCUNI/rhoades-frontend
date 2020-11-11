import React, { useState } from 'react';

import { IconButton } from '@material-ui/core';

import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';

import { CustomTooltip, CustomInput } from 'components';

const CustomInputPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <CustomInput
      beforeicon={
        <IconButton disabled aria-label="password-icon">
          <LockRoundedIcon />
        </IconButton>
      }
      aftericon={
        <CustomTooltip
          placement="left"
          title={
            !showPassword ? 'Mostrar contraseña' : 'Ocultar contraseña'
          }
        >
          <IconButton
            aria-label="show-hide-icon"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <VisibilityRoundedIcon />
            ) : (
              <VisibilityOffRoundedIcon />
            )}
          </IconButton>
        </CustomTooltip>
      }
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  );
};

export default CustomInputPassword;
