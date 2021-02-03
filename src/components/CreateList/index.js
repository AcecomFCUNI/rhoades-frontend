import React from 'react'
import { useDispatch } from 'react-redux'

import { 
  Button, 
  Typography, 
  makeStyles
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { CustomSelect } from 'components'
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
        <Typography variant='h6'>Nota</Typography>
        <Typography variant='subtitle2'>Usted no tiene una lista registrada de <strong>{translateWord(condition)}</strong> para las elecciones</Typography>
      </Alert>
      <Typography variant='subtitle1' className={classes.mainTitle}>Para crear una lista, seleccione qué lista desea crear a continuación:</Typography>
      <div className={classes.createListSection}>
      <CustomSelect
        labelId='type-of-estate-label'
        selectId='type-of-estate-selector'
        options={estates}
        label='Tipo de lista'
        value={estateType}
        onChange={handleEstateTypeSelected}
      />
      <Button variant='contained' color='primary' size='large' onClick={handleCreateNewList} className={classes.createButton}>
        Crear lista
      </Button>
      </div>
    </React.Fragment>
  )
}

export default CreateTeacherList