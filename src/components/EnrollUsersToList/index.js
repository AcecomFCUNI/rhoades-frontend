import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Grid, Typography } from '@material-ui/core'
import CustomInput from 'components/CustomInput'

import { enrollUserToListRequest, showAlertSnackbar } from 'ducks';
import { isAValidCodeByRule, formatCodeToRule, ENTER_ONE_CODE, ENTER_VALID_DNI_CODE, ENTER_VALID_UNI_CODE } from 'tools';


const EnrollUsersToList = ({ estate }) => {
  const dispatch = useDispatch()
  const [dniInput, setDniInput] = useState('')
  const [codeInput, setCodeInput] = useState('')

  const handleValidateCredentials = () => {
    if(dniInput.length > 0) {
      const match = isAValidCodeByRule(dniInput, 'dni')

      if (match) dispatch(enrollUserToListRequest({ documentType: 0, code: dniInput, estate }))
      else dispatch(showAlertSnackbar(ENTER_VALID_DNI_CODE));
    }
    else if(codeInput.length > 0) {
      const match = isAValidCodeByRule(codeInput, 'uni')

      if (match) dispatch(enrollUserToListRequest({ documentType: 1, code: codeInput, estate }))
      else dispatch(showAlertSnackbar(ENTER_VALID_UNI_CODE));
    }
    else dispatch(showAlertSnackbar(ENTER_ONE_CODE))
  };
  const handleOnChangeCodeInput = (event) => setCodeInput(formatCodeToRule(event.target.value, 'uni', true)) 
  const handleOnChangeDniInput = (event) => setDniInput(formatCodeToRule(event.target.value, 'dni')) 

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4} lg={3} container justify='center'>
        <Typography variant='h4'>Ingrese el documento del docente que desea inscribir</Typography>     
      </Grid>
      <Grid container item xs={12} sm={12} md={8} lg={9} spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6} md={5}>
          <CustomInput 
            disabled={dniInput.length > 0} 
            placeholder='Código UNI'
            value={codeInput}
            onChange={handleOnChangeCodeInput}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <CustomInput 
            disabled={codeInput.length > 0} 
            placeholder='DNI'
            value={dniInput}
            onChange={handleOnChangeDniInput}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            size='large'
            color='primary'
            variant='contained'
            onClick={handleValidateCredentials}
            >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EnrollUsersToList
