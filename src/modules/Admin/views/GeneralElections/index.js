import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  LinearProgress,
  Typography,
  makeStyles
} from '@material-ui/core';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';

import { CustomSelect, CustomTable } from 'components'
import * as ducks from 'ducks'
import * as constants from 'constants/index'

const useStyles = makeStyles((theme) => ({
  titleView: {
    fontSize: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: 25
    }
  },
  subtitleView: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: 14
    }
  },
  electionTypeSelector: {
    [theme.breakpoints.only('md')]: {
      flexGrow: 1
    },
  },
  filters: {
    marginTop: theme.spacing(3),
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  listsTable: {
    marginTop: theme.spacing(3)
  }
}));

const columns = [
  {
    title: '#',
    value: 'name',
    render: (list, index) => 
      <Typography variant='subtitle2'>
        {index + 1}
      </Typography>
  },
  {
    title: 'Personero',
    value: 'owner',
    render: (list) => 
      <Typography variant='subtitle2'>
        Lista de {list.owner}
      </Typography>
  },
]

const tableActions = [
  {
    label: 'Ver detalle',
    icon: <InfoRoundedIcon />,
    onClick: (list) => {
      console.log(list)
    }
  }
];

const GeneralElections = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [electionType, setElectionType] = useState(constants.generalElections[0].value)
  const adminLists = useSelector(state => state.lists.adminLists)

  const handleOnChangeElectionType = (event) => {
    setElectionType(event.target.value)
  }

  const handleOnChangePage = (event, page) => setPage(page);
  const handleOnChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const queryParams = {
      type: electionType
    }
    dispatch(ducks.getListsForAdminRequest(queryParams))
  }, [dispatch, electionType])

  return (
    <>
      <Typography variant='h1' className={classes.titleView}>Elecciones generales</Typography>
      <Typography variant='subtitle1' className={classes.subtitleView}>Utilice los siguientes filtros para revisar las listas según desee:</Typography>
      <div className={classes.filters}>
        <CustomSelect
          className={classes.electionTypeSelector}
          labelId='election-type-label'
          selectId='election-type-selector'
          options={constants.generalElections}
          label='Tipo de elección'
          value={electionType}
          onChange={handleOnChangeElectionType}
        />
      </div>
      <CustomTable
        summaryTableInfoIsEnabled={false}
        cardHeader={(adminLists.loading) && <LinearProgress />}
        className={classes.listsTable}
        title='Listas filtradas'
        noDataLabel='No existen listas para esta elección'
        columns={columns}
        data={adminLists.data}
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
          rowsPerPageOptions: [10, 15]
        }}
      />
    </>
  )
}

export default GeneralElections
