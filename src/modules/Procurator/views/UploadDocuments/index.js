import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import clsx from 'clsx'
import {
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { DropzoneDialogBase } from 'material-ui-dropzone';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { CustomTable } from 'components';
import * as tools from 'tools'
import * as actions from 'ducks'
import * as keys from 'keys'

const maxFileSize = 5242880
const filesLimit = 1

const useStyles = makeStyles((theme) => ({
  previewChip: {
    maxWidth: 240,
    marginTop: theme.spacing(3)
  },
  uploadButton: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 20
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  cardHeaderTitle: {
    fontSize: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: 25
    }
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  messageAlert: {
    marginBottom: theme.spacing(3)
  },
  tableUrlName: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
    '&:active': {
      backgroundColor: theme.palette.error.dark,
    }
  },
  deleteDialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
}));

const UploadDocuments = () => {
  const dispatch = useDispatch()
  const files = useSelector(state => state.files)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [condition, setCondition] = useState('');
  const lists = useSelector(state => state.lists.data)
  const auth = useSelector(state => state.firebase.auth)
  const classes = useStyles();

  const columns = [
    {
      title: 'Nombre',
      value: 'name',
      render: ({ name }) => 
        <Typography variant='h6' color='primary'>
          {name}
        </Typography>
    },
    {
      title: 'Fecha de subida',
      value: 'createdAt',
      render: ({ createdAt }) => 
        <Typography variant='subtitle2'>
          {tools.getFormattedDate(createdAt)}
        </Typography>
    }
  ];

  const tableActions = [
    {
      label: 'Descargar archivo',
      icon: <GetAppRoundedIcon />,
      onClick: async (file) => {
        const { data } = await axios.get(`${keys.API_URL}/file/download/${file._id}/${auth.uid}`)
        const downloadLink = document.createElement('a');

        downloadLink.href = data;
        downloadLink.download = file.name;
        downloadLink.click();
      }
    },
    {
      label: 'Eliminar archivo',
      icon: <DeleteRoundedIcon />,
      onClick: (file) => {
        file.owner = auth.uid
        dispatch(actions.openDeleteOneFileDialog(file))
      }
    }
  ];

  const checkIfListsAreClosed = (lists) => {
    if(checkIfUserHasCreatedLists(lists)) return false

    let listsAreClosed = true

    for(const list of Object.values(lists)) {
      listsAreClosed = listsAreClosed && list.closed
    }

    return listsAreClosed
  }

  const checkIfUserHasCreatedLists = (lists) => Object.keys(lists || {}).length === 0

  const getHeader = () => 
    <div className={classes.cardHeader}>
      <Typography variant='h1' className={classes.cardHeaderTitle}>Subir archivos</Typography>
      <Button
        disabled={
          // if the procurator doesn't have any lists
          checkIfUserHasCreatedLists(lists || {}) || 
          // or if their lists are closed or not
          checkIfListsAreClosed(lists || {})
        }
        size='large'
        className={classes.uploadButton}
        variant="contained"
        color="primary"
        onClick={() => dispatch(actions.openUploadFilesDialog())}
      >
        Nuevo archivo
      </Button>
    </div>

  const handleOnChangePage = (event, page) => setPage(page);
  const handleOnChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleOnAddNewFiles = (newFiles) => {
    // handle the logic in order to upload just one file
    const newFile = newFiles[0]
    newFile.name = newFile.file.name
    newFile.lastModified = newFile.file.lastModified
    
    dispatch(actions.uploadOneFile(newFile))
  }

  const handleOnDeleteOneFile = () => dispatch(actions.removeOneFile())

  const handleOnCloseDialog = () => dispatch(actions.closeUploadFilesDialog())
  const handleOnSaveDocuments = () => {
    if(condition.length === 0) dispatch(actions.showAlertSnackbar(tools.createNewAlertSnackbarMessage('error', 'Seleccione alguna de las listas disponibles')))
    else {
      const list = lists[condition]
      const fileToUpload = files.uploadedFiles[0]
      
      // add the id to file
      fileToUpload.list = list.id
      dispatch(actions.saveOneFileRequest(fileToUpload, list))
      dispatch(actions.closeUploadFilesDialog());
      setCondition('')
    }
  }
  const handleConditionSelected = (event) => setCondition(event.target.value);
  const handleDeleteOneDocument = () => {
    dispatch(actions.deleteOneFileRequest(files.fileToDelete))
    dispatch(actions.closeDeleteOneFileDialog())
  }
  const handleCloseDeleteOneDocumentDialog = () => dispatch(actions.closeDeleteOneFileDialog())

  useEffect(() => {
    if(lists) dispatch(actions.getAllFilesFromListRequest(lists))
  }, [dispatch, lists])

  return (
    <React.Fragment>
      {
        checkIfUserHasCreatedLists(lists || {}) && <Alert severity="warning" className={classes.messageAlert}>
          <Typography variant='h6'>Nota</Typography>
          <Typography variant='subtitle2'>Usted no puede subir documentos hasta que haya creado al menos una lista</Typography>
        </Alert>
      }
      {
        checkIfListsAreClosed(lists || {}) && <Alert severity="info" className={classes.messageAlert}>
          <Typography variant='h6'>Nota</Typography>
      <Typography variant='subtitle2'>Usted ya no puede subir documentos debido a que ya cerró sus listas creadas</Typography>
        </Alert>
      }
      {getHeader()}
      <CustomTable
        tableDisabled={checkIfUserHasCreatedLists(lists || {})}
        tableRowClassName={classes.tableRowsData}
        summaryTableInfoIsEnabled={false}
        className={clsx(classes.applicantsTable, classes.marginTop)}
        title='Archivos subidos'
        noDataLabel='Aún no ha subido ningún archivo'
        columns={columns}
        data={files.savedFiles}
        rowsPerPage={rowsPerPage}
        page={page}
        dataId="_id"
        actionsAreEnabled
        actions={tableActions}
        paginationProps={{
          labelRowsPerPage: 'Resultados por página',
          onChangePage: handleOnChangePage,
          onChangeRowsPerPage: handleOnChangeRowsPerPage,
          page,
          rowsPerPageOptions: [10, 25],
          component: 'div',
        }}
        cardHeader={(files.addLoading || files.getLoading || files.deleteLoading) && <LinearProgress />}
      />
      <DropzoneDialogBase
        dropzoneText='Arrastre un archivo o haga click aquí'
        acceptedFiles={['.pdf']}
        fileObjects={files.uploadedFiles}
        cancelButtonText='Cancelar'
        submitButtonText='Subir'
        maxFileSize={maxFileSize}
        showAlerts={false}
        filesLimit={filesLimit}
        open={files.openAddDialog}
        onAdd={handleOnAddNewFiles}
        onDelete={handleOnDeleteOneFile}
        onClose={handleOnCloseDialog}
        onSave={handleOnSaveDocuments}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText=""
        showFileNamesInPreview={true}
        dialogTitle={
          <React.Fragment>
            <Typography variant='body1' className={classes.dialogTitle}>Seleccione una de sus listas para subir un documento</Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="list-estate">Listas disponibles</InputLabel>
              <Select
                variant='outlined'
                labelId="list-estate"
                id="list-estate-selector"
                value={condition}
                onChange={handleConditionSelected}
                label="Listas disponibles"
              >
                <MenuItem value=''><i>Seleccione una lista</i></MenuItem>
                {lists && Object.keys(lists).map((condition) => <MenuItem disabled={lists[condition].closed} key={condition} value={condition}>
                  {tools.getLabelFromEstate(lists[condition].type, condition)}
                </MenuItem>)}
              </Select>
            </FormControl>
          </React.Fragment>
        }
      />
      <Dialog
        maxWidth="sm"
        fullWidth
        open={files.openDeleteDialog}
        onClose={handleCloseDeleteOneDocumentDialog}
        aria-labelledby="delete-document-dialog">
        <DialogContent className={classes.driverInfoContent}>
          <Typography variant='body1' className={classes.deleteDialogTitle}>Usted está a punto de eliminar este documento. ¿Desea continuar?</Typography>
        </DialogContent>
        <DialogActions>
            <Button
              className={clsx(classes.deleteButton, classes.dialogAction)}
              onClick={handleDeleteOneDocument}
              variant="contained"
              color="primary">
              Eliminar
            </Button>
            <Button
              className={classes.dialogAction}
              onClick={handleCloseDeleteOneDocumentDialog}
              variant="outlined"
              color="primary">
              Cancelar
            </Button>
        </DialogActions>
      </Dialog> 
    </React.Fragment>
  );
}

export default UploadDocuments