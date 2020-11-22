import React from 'react'
import { useDispatch } from 'react-redux'

import { 
  Button, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  makeStyles
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

import { createListByUserIdAndTypeRequest } from 'ducks'
import { translateWord } from 'tools'

const useStyles = makeStyles(theme => ({
  mainTitle: {
    margin: '20px 0'
  },
  createListSection: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  paperSelector: {
    width: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  createButton: {
    marginLeft: 15,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 20
    }
  }
}))

const CreateTeacherList = ({ uid, estate, estateType, handlEstateTypeSelected, estates }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCreateNewList = () => dispatch(createListByUserIdAndTypeRequest(uid, estate, estateType))

  return (
    <React.Fragment>
      <Alert severity="warning">
        <AlertTitle>Nota</AlertTitle>
        Ud. no tiene una lista registrada de <strong>{translateWord(estate)}</strong> para las elecciones
      </Alert>
      <Typography variant='subtitle1' className={classes.mainTitle}>Para crear una lista, seleccione qué lista desea crear:</Typography>
      <div className={classes.createListSection}>
      <Paper component="form" className={classes.paperSelector}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-of-estate">Tipo de lista</InputLabel>
          <Select
            labelId="type-of-estate"
            id="type-of-estate-selector"
            value={estateType}
            onChange={handlEstateTypeSelected}
            label="Tipo de lista"
          >
            {estates.map(({ label, value }) => <MenuItem key={value} value={value}>
              {label}
            </MenuItem>)}
          </Select>
        </FormControl>
      </Paper>
      <Button variant='contained' color='primary' size='large' onClick={handleCreateNewList} className={classes.createButton}>
        Crear lista
      </Button>
      </div>
    </React.Fragment>
  )
}

export default CreateTeacherList