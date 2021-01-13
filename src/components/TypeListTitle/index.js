import React from 'react'
import { Typography, Button, makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'

import * as ducks from 'ducks'

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  title: {
    flexGrow: 1,
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    }
  },
  finishListButton: {
    width: 200,
    [theme.breakpoints.down('sm')]: {
      marginTop: 10,
      width: '100%'
    }
  },
  infoAlert: {
    marginBottom: 20
  }
}))

const TypeListTitle = (props) => {
  const { label, condition } = props
  const classes = useStyles()
  const lists = useSelector(state => state.lists.data)
  const dispatch = useDispatch()

  const handleFinishListRegistration = () => dispatch(ducks.finishRegistrationListRequest(lists, condition))

  return (
    <React.Fragment>
      {
      lists[condition].closed && <Alert severity="success" className={classes.infoAlert}>
          <Typography variant='h6'>Nota</Typography>
          <Typography variant='subtitle2'>Usted ya ha finalizado el registro de la lista actual</Typography>
        </Alert>
      }
      <div className={classes.titleWrapper}>
        <Typography variant='h1' className={classes.title}>{label}</Typography>
        <Button
          disabled={lists[condition].closed}
          variant='contained'
          size='large'
          color='primary'
          className={classes.finishListButton}
          onClick={handleFinishListRegistration}
        >
          Finalizar lista
        </Button>
      </div>
    </React.Fragment>
  )
}

export default TypeListTitle
