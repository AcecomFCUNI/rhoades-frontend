import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Typography,
  Drawer,
  makeStyles,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

import * as ducks from 'ducks'

const useStyles = makeStyles(theme => ({
  drawer: {
    '& > .MuiDrawer-paper': {
      width: 450,
      backgroundColor: theme.palette.custom.white,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& > .MuiDrawer-paper': {
        width: 450,
      },
    },
  },
  messageAlert: {
  },
  drawerHeader: {
    
  },
  drawerHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  drawerHeaderTitle: {
    color: theme.palette.white,
    fontWeight: 600,
    marginLeft: theme.spacing(1),
    fontSize: 22,
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    }
  },
  drawerHeaderLoader: {
    height: 4,
    marginTop: 1
  },
  drawerHeaderCloseButtonIcon: {
    color: theme.palette.white,
  },
  applicantsWrapper: {
    margin: theme.spacing(3, 4)
  },
  applicantsTitle: {

  },
  applicantsContent: {
    marginTop: theme.spacing(2)
  },
  applicantAccordion: {
    '&::before': {
      backgroundColor: theme.palette.custom.white,
      height: 2
    }
  },
  accordionDetails: {
    display: 'flex',
    alignItems: 'center'
  },
  applicantAttrs: {
    display: 'flex',
  },
  applicantKeyAttr: {
    fontWeight: 'bold'
  },
  applicantValuesAttrs: {
    marginLeft: theme.spacing(3)
  },
  actionButtons: {
    marginTop: theme.spacing(3),
  },
  actionButtonsTitle: {
  },
  actionButtonsContent: {
    marginTop: theme.spacing(2)
  }
}))

const CustomDrawer = (props) => {
  const {
    classNameDrawer,
    openDrawer,
    onCloseDrawer,
    selectedList,
    adminId
  } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false);
  const reviewLoading = useSelector(state => state.lists.reviewLoading);

  const handleChangeAccordionSelected = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const actions = [
    {
      label: 'Descargar documentos',
      icon: <GetAppRoundedIcon />,
      onClick: () => {
        console.log('download documents')
      }
    },
    {
      label: 'Aceptar lista',
      icon: <DoneOutlineRoundedIcon />,
      onClick: () => dispatch(ducks.reviewListForAdminRequest(adminId, 'accepted', {
        args: {
          id: selectedList?.id,
          owner: selectedList?.owner?.id
        }
      }))
    },
    {
      label: 'Agregar una observación',
      icon: <VisibilityRoundedIcon />,
      onClick: () => dispatch(ducks.reviewListForAdminRequest(adminId, 'observed', {
        args: {
          id: selectedList?.id,
          owner: selectedList?.owner?.id,
          observation: 'test observation'
        }
      }))
    },
    {
      label: 'Rechazar lista',
      icon: <ClearRoundedIcon />,
      onClick: () => dispatch(ducks.reviewListForAdminRequest(adminId, 'rejected', {
        args: {
          id: selectedList?.id,
          owner: selectedList?.owner?.id,
          observation: 'test observation'
        }
      }))
    }
  ]

  return (
    <Drawer
      className={clsx(classes.drawer, classNameDrawer)}
      variant='temporary'
      anchor='right'
      open={openDrawer}
      onClose={onCloseDrawer}
    >
      {/* HEADER */}
      <div className={classes.drawerHeader}>
        <div className={classes.drawerHeaderContent}>
          <IconButton onClick={onCloseDrawer}>
            <CloseRoundedIcon className={classes.drawerHeaderCloseButtonIcon} />
          </IconButton>
          <Typography variant='h2' className={classes.drawerHeaderTitle}>Detalle de lista</Typography>
        </div>
        <div className={classes.drawerHeaderLoader}>
          {
            reviewLoading && <LinearProgress color='primary' />
          }
        </div>
      </div>
      {/* APPLICANTS */}
      <div className={classes.applicantsWrapper}>
      {
        !selectedList?.applicants || selectedList?.applicants.length === 0 ?
          <Alert severity="warning" className={classes.messageAlert}>
            <Typography variant='subtitle2'>Esta lista no posee aplicantes</Typography>
          </Alert> :
            <>
              <div className={classes.applicantsTitle}>
                <Typography variant='h3'>Integrantes:</Typography>
              </div>
              <div className={classes.applicantsContent}>
                {selectedList?.applicants.map(applicant =>
                  <Accordion key={applicant.id} elevation={0} className={classes.applicantAccordion} expanded={expanded === `panel-${applicant.id}`} onChange={handleChangeAccordionSelected(`panel-${applicant.id}`)}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    aria-controls={`panel1a-content-${applicant.id}`}
                    id={`panel1a-header-${applicant.id}`}
                  >
                    <Typography variant='h6' className={classes.heading}>{applicant.names} {applicant.lastName} {applicant.secondLastName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
                    <div className={classes.applicantKeysAttrs}>
                      <Typography variant='h6' className={classes.applicantKeyAttr}>
                        Email:
                      </Typography>
                      <Typography variant='h6' className={classes.applicantKeyAttr}>
                        Código UNI:
                      </Typography>
                      <Typography variant='h6' className={classes.applicantKeyAttr}>
                        DNI:
                      </Typography>
                      <Typography variant='h6' className={classes.applicantKeyAttr}>
                        Facultad:
                      </Typography>
                      <Typography variant='h6' className={classes.applicantKeyAttr}>
                        Especialidad:
                      </Typography>
                    </div>
                    <div className={classes.applicantValuesAttrs}>
                      <Typography variant='subtitle2' className={classes.applicantValueAttr}>
                        {applicant.mail}
                      </Typography>
                      <Typography variant='subtitle2' className={classes.applicantValueAttr}>
                        {applicant.UNICode}
                      </Typography>
                      <Typography variant='subtitle2' className={classes.applicantValueAttr}>
                        {applicant.documentNumber}
                      </Typography>
                      <Typography variant='subtitle2' className={classes.applicantValueAttr}>
                        {applicant.faculty}
                      </Typography>
                      <Typography variant='subtitle2' className={classes.applicantValueAttr}>
                        {applicant.specialty}
                      </Typography>
                    </div>
                  </AccordionDetails>
                </Accordion>)}
              </div>
            </>
      }
      {/* ACTIONS */}
      <div className={classes.actionButtons}>
        <div className={classes.actionButtonsTitle}>
          <Typography variant='h3'>Acciones:</Typography>
        </div>
        <Paper elevation={0} className={classes.actionButtonsContent}>
          <List component="nav">
            {
              actions.map((action, index) =>
                <ListItem key={`${action.label}-${index}`} button onClick={action.onClick}>
                  <ListItemIcon>
                    {action.icon}
                  </ListItemIcon>
                  <ListItemText primary={action.label} />
                </ListItem>)
            }
          </List>
        </Paper>
      </div>
      </div>
    </Drawer>
  )
}

CustomDrawer.propTypes = {
  classNameDrawer: PropTypes.string,
  openDrawer: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
  selectedList: PropTypes.object.isRequired,
  adminId: PropTypes.string.isRequired
}

CustomDrawer.defaultProps = {
  classNameDrawer: '',
  openDrawer: false
}

export default CustomDrawer
