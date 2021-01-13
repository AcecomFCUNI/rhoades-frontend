import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
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
    fontSize: 18
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
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
    '&:active': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const getDialogTitle = (condition) => {
  switch(condition) {
    case 'teachers': return 'Usted está a punto de eliminar la siguiente persona de su lista de docentes. ¿Desea continuar?'
    case 'students': return 'Usted está a punto de eliminar la siguiente persona de su lista de estudiantes. ¿Desea continuar?'
    default: return ''
  }
}

const ApplicantDetailsDialog = (props) => {
  const { condition } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openDialog, data: applicant } = useSelector(state => state.lists.removeUser)
  const lists = useSelector(state => state.lists.data)

  const handleCloseRemoveApplicantDialog = () => dispatch(actions.closeRemoveUserFromListDialog())
  const handleRemoveApplicantFromList = () => {
    dispatch(actions.removeUserFromListRequest(applicant, condition, lists))
    dispatch(actions.closeRemoveUserFromListDialog())
  }

  return (
    !applicant ? null :
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openDialog}
      onClose={handleCloseRemoveApplicantDialog}
      aria-labelledby="remove-applicant-dialog">
      <DialogContent className={classes.driverInfoContent}>
        <Typography variant='h2' className={classes.dialogTitle}>{getDialogTitle(condition)}</Typography>
        <Divider className={classes.divider} />
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>Nombre completo:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.names} {applicant.lastName} {applicant.secondLastName}</Typography>
        </div>
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>Código UNI:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.UNICode}</Typography>
        </div>
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>DNI:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.documentNumber}</Typography>
        </div>
        <div className={classes.attribute}>
          <Typography variant='h6' className={classes.itemTitle}>Facultad:</Typography>
          <Typography variant='subtitle2' className={classes.itemValue}>{applicant.faculty}</Typography>
        </div>
        <DialogActions>
          <Button
            className={clsx(classes.deleteButton, classes.dialogAction)}
            onClick={handleRemoveApplicantFromList}
            variant="contained"
            color="primary">
            Eliminar
          </Button>
          <Button
            className={classes.dialogAction}
            onClick={handleCloseRemoveApplicantDialog}
            variant="outlined"
            color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>  
  )
}

export default ApplicantDetailsDialog