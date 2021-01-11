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
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  paperEstateTypeSelector: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  createButton: {
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 20
    }
  }
}))

const CreateTeacherList = (props) => {
  const { uid, condition, estateType, handleEstateTypeSelected, estates, faculty } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleCreateNewList = () => dispatch(createListByUserIdAndTypeRequest(uid, condition, estateType, faculty))
  
  return (
    <React.Fragment>
      <Alert severity="warning">
        <AlertTitle>Nota</AlertTitle>
        Ud. no tiene una lista registrada de <strong>{translateWord(condition)}</strong> para las elecciones
      </Alert>
      <Typography variant='subtitle1' className={classes.mainTitle}>Para crear una lista, seleccione qué lista desea crear a continuación:</Typography>
      <div className={classes.createListSection}>
      <Paper component="form" className={classes.paperEstateTypeSelector} elevation={0}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-of-estate">Tipo de lista</InputLabel>
          <Select
            labelId="type-of-estate"
            id="type-of-estate-selector"
            value={estateType}
            onChange={handleEstateTypeSelected}
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