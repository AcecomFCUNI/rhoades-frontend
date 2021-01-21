import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Dialog,
  DialogContent,
  Typography,
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
  },
  finishRegistrationButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
    '&:active': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const getDialogTitle = () => 'Usted está a punto de finalizar la inscripción de la lista actual. ¿Desea continuar?'

const FinishRegistrationListDialog = (props) => {
  const { condition } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openDialog } = useSelector(state => state.lists.finishList)
  const lists = useSelector(state => state.lists.data)

  const handleCloseFinishRegistrationListDialog = () => dispatch(actions.closeFinishRegistrationListDialog())
  const handleFinishRegistrationList = () => {
    dispatch(actions.finishRegistrationListRequest(lists, condition))
    dispatch(actions.closeFinishRegistrationListDialog())
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openDialog}
      onClose={handleCloseFinishRegistrationListDialog}
      aria-labelledby="finish-list-dialog">
      <DialogContent className={classes.driverInfoContent}>
        <Typography variant='body1' className={classes.dialogTitle}>{getDialogTitle()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className={clsx(classes.finishRegistrationButton, classes.dialogAction)}
          onClick={handleFinishRegistrationList}
          variant="contained"
          color="primary">
          Finalizar
        </Button>
        <Button
          className={classes.dialogAction}
          onClick={handleCloseFinishRegistrationListDialog}
          variant="outlined"
          color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>  
  )
}

export default FinishRegistrationListDialog