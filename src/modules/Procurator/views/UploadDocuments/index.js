import React, { useState } from 'react';
import clsx from 'clsx'
import { Button, Typography, makeStyles } from '@material-ui/core';
import { DropzoneDialogBase } from 'material-ui-dropzone';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { CustomTable } from 'components';
import * as tools from 'tools'

const useStyles = makeStyles((theme) => ({
  previewChip: {
    maxWidth: 240
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
    [theme.breakpoints.down('xs')]: {
      fontSize: 25
    }
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  some: {
    backgroundColor: 'red'
  }
}));

const UploadDocuments = () => {
  const [openUploadDocumentsDialog, setOpenUploadDocumentsDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [savedFiles, setSavedFiles] = useState([]);
  const classes = useStyles();

  const columns = [
    {
      title: 'Nombre',
      value: 'name',
      render: ({ name }) => name
    },
    {
      title: 'Fecha de subida',
      value: 'lastModified',
      render: ({ lastModified }) => tools.getFormattedDate(lastModified)
    }
  ];

  const tableActions = [
    {
      label: 'Eliminar archivo',
      icon: <DeleteRoundedIcon />,
      onClick: (file) => {
        console.log(file)
        const uploadedFiles = savedFiles.filter(savedFile => savedFile.id !== file.id)
        setSavedFiles(uploadedFiles)
      }
    }
  ];

  const getHeader = () => 
    <div className={classes.cardHeader}>
      <Typography variant='h2' className={classes.cardHeaderTitle}>Subir archivos</Typography>
      <Button
        size='large'
        className={classes.uploadButton}
        variant="contained"
        color="primary"
        onClick={() => setOpenUploadDocumentsDialog(true)}
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
    const formattedFiles = newFiles.map((newFile, index) => ({
      ...newFile,
      id: tools.getRandomId(),
      name: newFile.file.name,
      lastModified: newFile.file.lastModifiedDate
    }))

    setUploadedFiles(formattedFiles)
  }

  const handleOnDeleteOneFile = (fileToDelete) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileToDelete.id)
    setUploadedFiles(updatedFiles)
  }

  const handleOnCloseDialog = () => setOpenUploadDocumentsDialog(false)
  const handleOnSaveDocuments = () => {
    // console.log('onSave', fileObjects);
    setSavedFiles([...savedFiles, ...uploadedFiles])
    setUploadedFiles([])
    setOpenUploadDocumentsDialog(false);
  }

  return (
    <React.Fragment>
      {getHeader()}
      <CustomTable
        // tableDisabled={lists.data[condition].closed}
        tableRowClassName={classes.tableRowsData}
        summaryTableInfoIsEnabled={false}
        className={clsx(classes.applicantsTable, classes.marginTop)}
        title='Archivos subidos'
        noDataLabel='Aún no ha subido ningún archivo'
        columns={columns}
        data={savedFiles}
        rowsPerPage={rowsPerPage}
        page={page}
        dataId="id"
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
        // cardHeader={(lists.addLoading || lists.removeUser.loading) && <LinearProgress />}
      />
      <DropzoneDialogBase
        dialogTitle=''
        dropzoneText='Arrastre un archivo o haga click aquí'
        acceptedFiles={['.pdf']}
        fileObjects={uploadedFiles}
        cancelButtonText='Cancelar'
        submitButtonText='Subir'
        maxFileSize={5000000}
        open={openUploadDocumentsDialog}
        onAdd={handleOnAddNewFiles}
        onDelete={handleOnDeleteOneFile}
        onClose={handleOnCloseDialog}
        onSave={handleOnSaveDocuments}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Archivos seleccionados"
        showFileNamesInPreview={true}
      />
    </React.Fragment>
  );
}

export default UploadDocuments