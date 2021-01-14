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
  deleteListButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
    '&:active': {
      backgroundColor: theme.palette.error.dark,
    }
  }
}))

const getDialogTitle = () => 'Usted está a punto de eliminar la lista actual. ¿Desea continuar?'

const FinishRegistrationListDialog = (props) => {
  const { condition } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { openDialog } = useSelector(state => state.lists.deleteList)
  const lists = useSelector(state => state.lists.data)

  const handleCloseDeleteListDialog = () => dispatch(actions.closeDeleteListDialog())
  const handleDeleteList = () => {
    dispatch(actions.deleteListRequest(lists, condition))
    dispatch(actions.closeDeleteListDialog())
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openDialog}
      onClose={handleCloseDeleteListDialog}
      aria-labelledby="delete-list-dialog">
      <DialogContent className={classes.driverInfoContent}>
        <Typography variant='h2' className={classes.dialogTitle}>{getDialogTitle()}</Typography>
        
      </DialogContent>
      <DialogActions>
          <Button
            className={clsx(classes.deleteListButton, classes.dialogAction)}
            onClick={handleDeleteList}
            variant="contained"
            color="primary">
            Eliminar
          </Button>
          <Button
            className={classes.dialogAction}
            onClick={handleCloseDeleteListDialog}
            variant="outlined"
            color="primary">
            Cancelar
          </Button>
      </DialogActions>
    </Dialog>  
  )
}

export default FinishRegistrationListDialog