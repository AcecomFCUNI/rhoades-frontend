import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';

import noDataSvg from 'assets/images/undraw/no_data.svg';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
    overflowX: 'auto'
  },
  inner: {},
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  spinnerTableWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '12px 0'
  },
  triggerLoadingDiv: {
    height: 30
  },
  noDataWrapper: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  noDataTitle: {
    textAlign: 'center',
    fontSize: 15,
    width: '100%',
    marginTop: 10,
    fontWeight: 'bold'
  },
  noDataImg: {
    width: 80
  }
}));

const CustomTable = (props) => {
  const {
    className,
    data,
    hoverableRows,
    rowsPerPage,
    paginationIsEnabled,
    paginationProps,
    dataId,
    tableRowsProps,
    tableRowsPropsHead,
    tableRowClassName,
    actionsAreEnabled,
    actionsAlignContent,
    summaryTableInfoIsEnabled,
    page,
    columns,
    actions,
    infiniteScrollLoading,
    title,
    titleIsEnabled,
    infiniteScroll,
    cardHeader,
    cardContentClassName,
    noDataLabel,
    ...rest
  } = props;
  const classes = useStyles();

  const getTableHead = (actionsEnabled, actionsLabel, actionsCellProps) => (
    <TableHead>
      <TableRow {...tableRowsPropsHead}>
        {columns.map(({ title, value, align = 'left' }) => (
          <TableCell key={value} align={align}>
            {title}
          </TableCell>
        ))}
        {actionsEnabled && (
          <TableCell {...actionsCellProps}>{actionsLabel}</TableCell>
        )}
      </TableRow>
    </TableHead>
  );

  const getData = () =>
    infiniteScroll
      ? data
      : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {summaryTableInfoIsEnabled && (
        <Typography color="textSecondary" gutterBottom variant="body2">
          {data.length} resultados encontrados. Página {page + 1} de{' '}
          {Math.ceil(data.length / rowsPerPage)}
        </Typography>
      )}
      <Card elevation={0}>
        {cardHeader && cardHeader}
        {titleIsEnabled ? (
          <React.Fragment>
            <CardHeader title={title} />
            <Divider />
          </React.Fragment>
        ) : null}
        <CardContent className={clsx(classes.content, cardContentClassName)}>
          <div className={classes.inner}>
            <Table>
              {getTableHead(actionsAreEnabled, 'Acciones', {
                align: 'right'
              })}
              {getData().length !== 0 && (
                <TableBody>
                  {getData().map((element, index) => (
                    <TableRow
                      key={element[dataId]}
                      hover={hoverableRows}
                      {...tableRowsProps}>
                      {columns.map(({ value, render, align = 'left' }) => (
                        <TableCell key={value} align={align}>
                          {render ? render(element, index) : element[value]}
                        </TableCell>
                      ))}
                      {actionsAreEnabled && (
                        <TableCell align={actionsAlignContent} className={clsx(tableRowClassName)}>
                          {actions.map(({ label, icon, onClick }) => (
                            <Tooltip key={label} title={label}>
                              <IconButton onClick={() => onClick(element)}>
                                {icon}
                              </IconButton>
                            </Tooltip>
                          ))}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {getData().length === 0 && (
              <div className={classes.noDataWrapper}>
                <img
                  className={classes.noDataImg}
                  alt="No hay datos"
                  src={noDataSvg}
                />
                <Typography
                  variant="subtitle1"
                  className={classes.noDataTitle}>
                  {noDataLabel ? noDataLabel : 'No hay datos para mostrar'}
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
        {infiniteScrollLoading}
        {paginationIsEnabled && (
          <CardActions className={classes.actions}>
            <TablePagination
              {...{
                ...paginationProps,
                component: 'div',
                rowsPerPage,
                count: data.length
              }}
            />
          </CardActions>
        )}
      </Card>
    </div>
  );
};

CustomTable.propTypes = {
  className: PropTypes.string,
  cardContentClassName: PropTypes.string,
  tableRowClassName: PropTypes.string,
  data: PropTypes.array.isRequired,
  hoverableRows: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  paginationIsEnabled: PropTypes.bool,
  paginationProps: PropTypes.object,
  dataId: PropTypes.string,
  tableRowsProps: PropTypes.object,
  tableRowsPropsHead: PropTypes.object,
  actionsAreEnabled: PropTypes.bool,
  actionsAlignContent: PropTypes.string,
  summaryTableInfoIsEnabled: PropTypes.bool,
  page: PropTypes.number,
  colums: PropTypes.array,
  actions: PropTypes.array,
  isUserTyping: PropTypes.bool,
  infiniteScrollLoading: PropTypes.node,
  title: PropTypes.string,
  titleIsEnabled: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  infiniteScroll: PropTypes.bool,
  cardHeader: PropTypes.node,
  noDataLabel: PropTypes.string
};

CustomTable.defaultProps = {
  data: [],
  hoverableRows: true,
  rowsPerPage: 25,
  paginationIsEnabled: true,
  dataId: 'id',
  actionsAreEnabled: false,
  actionsAlignContent: 'right',
  summaryTableInfoIsEnabled: true,
  columns: [],
  actions: [],
  page: 0,
  infiniteScrollLoading: null,
  title: 'Título de la tabla',
  titleIsEnabled: true,
  infiniteScroll: false,
  cardHeader: null,
  noDataLabel: null
};

export default CustomTable;
