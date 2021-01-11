import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'

import { Button, CircularProgress, Grid, Typography, makeStyles } from '@material-ui/core'
import CustomInput from 'components/CustomInput'

import * as actions from 'ducks';
import * as tools from 'tools';

const useStyles = makeStyles(theme => ({
  searchButtonLoading: {
    userSelect: 'none',
    opacity: 0.7,
    pointerEvents: 'none'
  },
  searchUserInput: {
    marginTop: theme.spacing(1)
  }
}))

const EnrollUsersToList = (props) => {
  const { condition, className } = props 
  const classes = useStyles()
  const dispatch = useDispatch()
  const profile = useSelector(state => state.firebase.profile)
  const { loading } = useSelector(state => state.user.validatingApplicant)
  const [dniInput, setDniInput] = useState('')
  const [codeInput, setCodeInput] = useState('')

  const handleValidateCredentials = () => {
    if(dniInput.length > 0) {
      const match = tools.isAValidCodeByRule(dniInput, 'dni')

      if (match) {
        // check if the dni is my current user dni
        if(profile.documentNumber === dniInput)
          dispatch(actions.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', 'DNI no válido, ingrese un DNI distinto al suyo')))
        else 
          dispatch(actions.checkIsAValidApplicantRequest({ documentType: 0, code: dniInput, condition }))
      }
      else dispatch(actions.showAlertSnackbar(tools.ENTER_VALID_DNI_CODE));
    }
    else if(codeInput.length > 0) {
      const match = tools.isAValidCodeByRule(codeInput, 'uni')

      if (match) {
        // check if the code uni is my current user code uni
        if(profile.UNICode === codeInput)
          dispatch(actions.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', 'Código no válido, ingrese un código UNI distinto al suyo')))
        else  
          dispatch(actions.checkIsAValidApplicantRequest({ documentType: 1, code: codeInput, condition }))
      }
      else dispatch(actions.showAlertSnackbar(tools.ENTER_VALID_UNI_CODE));
    }
    else dispatch(actions.showAlertSnackbar(tools.ENTER_ONE_CODE))
  };
  const handleOnChangeCodeInput = (event) => setCodeInput(tools.formatCodeToRule(event.target.value, 'uni', true)) 
  const handleOnChangeDniInput = (event) => setDniInput(tools.formatCodeToRule(event.target.value, 'dni')) 

  return (
    <Grid container spacing={1} className={clsx(className)}>
      <Grid item xs={12} sm={12} md={4} lg={3} container justify='center'>
        <Typography variant='h4'>Ingrese el documento del docente que desea inscribir</Typography>     
      </Grid>
      <Grid container item xs={12} sm={12} md={8} lg={9} spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6} md={5}>
          <CustomInput 
            className={classes.searchUserInput}
            disabled={dniInput.length > 0} 
            placeholder='Código UNI'
            value={codeInput}
            onChange={handleOnChangeCodeInput}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <CustomInput 
            className={classes.searchUserInput}
            disabled={codeInput.length > 0} 
            placeholder='DNI'
            value={dniInput}
            onChange={handleOnChangeDniInput}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            className={clsx({
              [classes.searchButtonLoading]: loading
            })}
            fullWidth
            size='large'
            color='primary'
            variant='contained'
            onClick={handleValidateCredentials}
            >
            {loading ? <CircularProgress size={24} style={{ color: '#FFF' }} /> : 'Buscar'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EnrollUsersToList
