import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Divider,
  DialogActions,
  makeStyles
} from '@material-ui/core'

import * as ducks from 'ducks'

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
  },
  observationDivider: {
    margin: theme.spacing(1, 0)
  },
  observationSection: {
  }
}))


const translateStatus = (status) => {
  switch(status) {
    case 'accepted': return 'aceptar'
    case 'rejected': return 'rechazar'
    case 'observed': return 'poner en observación'
    default: return ''
  }
}

const ReviewListConfirmationDialog = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const reviewList = useSelector(state => state.lists.reviewList)
  
  const getDialogTitle = () => `Usted está a punto de ${translateStatus(reviewList?.options?.status || '')} la lista actual, esta acción no se puede deshacer ¿Desea continuar?`
  const handleCloseReviewListDialog = () => dispatch(ducks.closeReviewListDialog())
  const handleReviewList = () => {
    const adminId = reviewList.options.adminId
    const status = reviewList.options.status
    const bodyRequest = reviewList.options.bodyRequest
    dispatch(ducks.reviewListForAdminRequest(adminId, status, bodyRequest))
    dispatch(ducks.closeReviewListDialog())
  }

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={reviewList.openDialog}
      onClose={handleCloseReviewListDialog}
      aria-labelledby="finish-list-dialog">
      <DialogContent className={classes.driverInfoContent}>
        <Typography variant='body1' className={classes.dialogTitle}>{getDialogTitle()}</Typography>
        {
          reviewList?.options?.bodyRequest?.args?.observation && 
            <React.Fragment>
              <Divider className={classes.observationDivider} />
              <Typography variant='subtitle1' className={classes.observationSection}><b>Observación:</b> {reviewList?.options?.bodyRequest?.args?.observation}</Typography>
            </React.Fragment>
        }
      </DialogContent>
      <DialogActions>
        <Button
          className={clsx(classes.finishRegistrationButton, classes.dialogAction)}
          onClick={handleReviewList}
          variant="contained"
          color="primary">
          Aceptar
        </Button>
        <Button
          className={classes.dialogAction}
          onClick={handleCloseReviewListDialog}
          variant="outlined"
          color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>  
  )
}

export default ReviewListConfirmationDialog