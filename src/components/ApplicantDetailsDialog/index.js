import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dialog,
  DialogContent,
  Typography,
  Divider,
  Button,
  makeStyles,
  DialogActions
} from '@material-ui/core'

import * as actions from 'ducks'

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  attribute: {
    marginBottom: 12
  },
  itemTitle: {
    fontSize: 16
  },
  itemValue: {
    color: '#4f4f4f',
    fontSize: 14
  },
  divider: {
    margin: '8px 0'
  }
}))

const getDialogTitle = (condition) => {
  switch(condition) {
    case 'teachers': return 'Usted está a punto de agregar la siguiente persona a su lista de docentes. ¿Desea continuar?'
    case 'students': return 'Usted está a punto de agregar la siguiente persona a su lista de estudiantes. ¿Desea continuar?'
    default: return ''
  }
}

const ApplicantDetailsDialog = (props) => {
  const { condition } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openDialog, data: applicant } = useSelector(state => state.user.validatingApplicant)
  const lists = useSelector(state => state.lists.data)

  const handleCloseApplicantDetailsDialog = () => dispatch(actions.closeApplicantDetailsDialog())
  const handleAddUserToList = () => {
    dispatch(actions.enrollUserToListRequest(applicant, condition, lists))
    dispatch(actions.closeApplicantDetailsDialog())
  }

  return (
    !applicant ? null :
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openDialog}
      onClose={handleCloseApplicantDetailsDialog}
      aria-labelledby="driverinfo-dialog">
      <DialogContent className={classes.driverInfoContent}>
        <Typography variant='body1' className={classes.dialogTitle}>{getDialogTitle(condition)}</Typography>
        <Divider className={classes.divider} />
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>Nombre completo:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.names} {applicant.lastName} {applicant.secondLastName}</Typography>
        </div>
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>{`${!applicant.documentType ? 'DNI:' : 'Código UNI:'}`}</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.code}</Typography>
        </div>
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>Facultad:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.faculty}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogAction}
          onClick={handleAddUserToList}
          variant="contained"
          color="primary">
          Agregar
        </Button>
        <Button
          className={classes.dialogAction}
          onClick={handleCloseApplicantDetailsDialog}
          variant="outlined"
          color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>  
  )
}

export default ApplicantDetailsDialog