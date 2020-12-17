import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import DocumentsTable from './components/DocumentsTable';

const useStyles = makeStyles((theme) =>
  createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210,
    },
    container: {
      padding: 20,
    },
    uploadButton: {
      marginBottom: 20,
    },
  })
);

export default function UploadDocuments() {
  const [open, setOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);

  const classes = useStyles();

  const dialogTitle = () => (
    <>
      <span>Subir archivos</span>
      <IconButton
        style={{ right: '12px', top: '8px', position: 'absolute' }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

  return (
    <Card className={classes.container}>
      <Button
        className={classes.uploadButton}
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Nuevo archivo
      </Button>

      <DocumentsTable files={fileObjects} />

      <DropzoneDialogBase
        dialogTitle={dialogTitle()}
        acceptedFiles={['.pdf']}
        fileObjects={fileObjects}
        cancelButtonText={'Cancelar'}
        submitButtonText={'Cargar'}
        maxFileSize={5000000}
        open={open}
        onAdd={(newFileObjs) => {
          console.log('onAdd', newFileObjs);
          setFileObjects([].concat(fileObjects, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
          console.log('onDelete', deleteFileObj);
        }}
        onClose={() => setOpen(false)}
        onSave={() => {
          console.log('onSave', fileObjects);
          setOpen(false);
        }}
        showPreviews={true}
        showPreviewsInDropzone={false}
        useChipsForPreview
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: classes.previewChip } }}
        previewText="Selected files"
        showFileNamesInPreview={true}
      />
    </Card>
  );
}
