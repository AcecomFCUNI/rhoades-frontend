import React from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineConnector
} from '@material-ui/lab';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  timelineItem: {
    '&::before': {
      content: 'none'
    }
  }
}));

const Instructions = (props) => {
  const { className } = props
  const classes = useStyles();

  return (
    <Timeline className={clsx(className)}>
      <TimelineItem className={classes.timelineItem}>
        <TimelineSeparator>
          <TimelineDot>
            <SearchRoundedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Buscar
            </Typography>
            <Typography>Busca por código UNI o DNI la persona que deseas agregar a tu lista</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineItem}>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <CheckRoundedIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Verifica
            </Typography>
            <Typography>Verifica que es la persona que buscas</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.timelineItem}>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <AddRoundedIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Agrégala
            </Typography>
            <Typography>Agrégala a tu lista. Esta persona aparecerá luego en la tabla que tiene en la parte inferior de la vista</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

export default Instructions