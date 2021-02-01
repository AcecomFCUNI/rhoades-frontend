import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Spinner,
  EnrollUsersToList,
  ApplicantDetailsDialog,
  CustomTable,
  TypeListTitle,
  Instructions,
  ApplicantRemoveDialog,
  FinishRegistrationListDialog,
  DeleteListDialog
} from 'components'
import { existsKeyInObject, getLabelFromEstate } from 'tools'
import { CreateTeacherList } from './components'

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import * as ducks from 'ducks'

const condition = 'teachers'

const useStyles = makeStyles(theme => ({
  applicantsTable: {
  },
  tableRowsData: {
  },
  dniAndCodeSection: {
  },
  marginTop: {
    marginTop: theme.spacing(3)
  }
}))

const TeacherList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lists = useSelector(state => state.lists)
  const { auth, profile } = useSelector(state => state.firebase)

  const columns = [
    {
      title: 'Código UNI',
      value: 'UNICode',
      render: ({ UNICode }) => 
        <Typography variant='subtitle2'>{UNICode}</Typography>
    },
    {
      title: 'DNI',
      value: 'documentNumber',
      render: ({ documentNumber, documentType }) => 
        <Typography variant='subtitle2'>{documentNumber} <b>({documentType})</b></Typography>
    },
    {
      title: 'Nombre completo',
      value: 'names',
      render: ({ names, lastName, secondLastName }) => 
        <Typography variant='subtitle2'>{names} {lastName} {secondLastName}</Typography>
    },
    {
      title: 'Facultad',
      value: 'faculty',
      render: ({ faculty }) =>
        <Typography variant='subtitle2'>{faculty}</Typography>
    }
  ];

  const tableActions = [
    {
      label: 'Eliminar postulante de la lista',
      icon: <DeleteRoundedIcon />,
      onClick: (pack) => dispatch(ducks.openRemoveUserFromListDialog(pack))
    }
  ];

  const handleOnChangePage = (event, page) => setPage(page);
  const handleOnChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    lists.createLoading || lists.deleteList.loading
      ? <Spinner /> 
      : !existsKeyInObject(condition, lists.data) 
      ? <CreateTeacherList uid={auth.uid} condition={condition} faculty={profile.faculty} /> 
      : <React.Fragment>
          <TypeListTitle label={`Tipo de lista: ${getLabelFromEstate(lists.data[condition]?.type, condition)}`} condition={condition} />
          <Instructions className={clsx(classes.marginTop)} />
          <EnrollUsersToList condition={condition} className={clsx(classes.dniAndCodeSection, classes.marginTop)} />  
          <ApplicantDetailsDialog condition={condition} />
          <CustomTable
            tableDisabled={lists.data[condition].closed}
            cardHeader={(lists.addLoading || lists.removeUser.loading) && <LinearProgress />}
            tableRowClassName={classes.tableRowsData}
            summaryTableInfoIsEnabled={false}
            className={clsx(classes.applicantsTable, classes.marginTop)}
            title='Postulantes'
            noDataLabel='Su lista aún no posee postulantes'
            columns={columns}
            data={lists.data[condition].applicants}
            rowsPerPage={rowsPerPage}
            page={page}
            dataId="UNICode"
            actionsAreEnabled
            actions={tableActions}
            paginationProps={{
              labelRowsPerPage: 'Resultados por página',
              onChangePage: handleOnChangePage,
              onChangeRowsPerPage: handleOnChangeRowsPerPage,
              page,
              rowsPerPageOptions: [10, 15]
            }}
          />
          <ApplicantRemoveDialog condition={condition} />
          <FinishRegistrationListDialog condition={condition} />
          <DeleteListDialog condition={condition} />
        </React.Fragment>
  )
}

export default TeacherList
