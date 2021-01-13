import React from 'react'
import { Typography, makeStyles, Button } from '@material-ui/core'

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
  }
}))

const TypeListTitle = (props) => {
  const { label } = props
  const classes = useStyles()

  const handleFinishListRegistration = () => {
    console.log('finish list')
  }

  return (
    <div className={classes.titleWrapper}>
      <Typography variant='h1' className={classes.title}>{label}</Typography>
      <Button
        variant='contained'
        size='large'
        color='primary'
        className={classes.finishListButton}
        onClick={handleFinishListRegistration}
      >
        Finalizar lista
      </Button>
    </div>
  )
}

export default TypeListTitle
