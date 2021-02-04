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
  Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

import { CustomInput } from 'components'
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
  },
  observationSection: {
    marginTop: theme.spacing(4),
  },
  observationInput: {
    fontSize: 16,
  },
  observationInputPaper: {
    marginTop: theme.spacing(2)
  },
  observationButtonWrapper: {
    marginTop: theme.spacing(2),
    textAlign: 'end'
  },
  observationButton: {
  }
}))

const showObservationSection = (status) => status.length !== 0 && status !== 'accepted'

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
  const [observation, setObservation] = useState('');
  const [status, setStatus] = useState('');
  const reviewLoading = useSelector(state => state.lists.reviewLoading);

  const handleChangeAccordionSelected = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleOnChangeObservation = (event) => setObservation(event.target.value)

  const getObservationButton = (status) => {
    let messageButton = ''

    switch(status) {
      case 'rejected': {
        messageButton = 'Rechazar'
        break
      }
      case 'observed': {
        messageButton = 'Aceptar'
        break
      }
      default: break
    }

    return (
      <Button
        className={classes.observationButton}
        disabled={observation.length === 0}
        onClick={() => {
          dispatch(ducks.openReviewListDialog({
            adminId,
            status,
            bodyRequest: {
              args: {
                id: selectedList?.id,
                owner: selectedList?.owner?.id,
                observation
              }
            }
          }))
          setObservation('')
          setStatus('')
        }}
        variant='contained'
        color='primary'
        size='large'
      >
        {messageButton}
      </Button>
    )
  }

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
      onClick: () => {
        setObservation('')
        setStatus('')
        dispatch(ducks.openReviewListDialog({
          adminId,
          status: 'accepted',
          bodyRequest: {
            args: {
              id: selectedList?.id,
              owner: selectedList?.owner?.id
            }
          }
        }))
      }
    },
    {
      label: 'Establecer en observación',
      icon: <VisibilityRoundedIcon />,
      onClick: () => setStatus('observed')
    },
    {
      label: 'Rechazar lista',
      icon: <ClearRoundedIcon />,
      onClick: () => setStatus('rejected')
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
        {
          showObservationSection(status) && <div className={classes.observationSection}>
            <Typography variant='h3'>Observación:</Typography>
            <CustomInput
              multiline
              className={classes.observationInputPaper}
              inputClassName={classes.observationInput}
              rows={3}
              placeholder='Ingrese una observación'
              value={observation}
              onChange={handleOnChangeObservation}
            />
            <div className={classes.observationButtonWrapper}>
              {getObservationButton(status)}
            </div>
          </div>
        }
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
