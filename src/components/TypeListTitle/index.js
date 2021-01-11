import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 30,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    }
  }
}))

const TypeListTitle = (props) => {
  const { label } = props
  const classes = useStyles()

  return (
    <Typography variant='h1' className={classes.title}>{label}</Typography>
  )
}

export default TypeListTitle
