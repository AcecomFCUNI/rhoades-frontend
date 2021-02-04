import React from 'react';
import clsx from 'clsx'
import PropTypes from 'prop-types';
import { Paper, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputPaper: {
    padding: '5px 6px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    fontFamily: 'Nunito',
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '1.4em',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.3em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.845em',
    },
  },
}));

const CustomInput = (props) => {
  const classes = useStyles();
  const { aftericon = null, beforeicon = null, submitinput, className, inputClassName, ...restProps } = props;

  return (
    <Paper component="form" className={clsx(classes.inputPaper, className)} elevation={0}>
      {beforeicon}
      <InputBase
        className={clsx(classes.input, inputClassName)} {...restProps} 
        spellCheck={false} 
        inputProps={{onKeyPress: (event) => {
          if(event.key === 'Enter') {
            event.preventDefault()
            if(submitinput) submitinput()
          }
        }}}
      />
      {aftericon}
    </Paper>
  );
};

CustomInput.propTypes = {
  className: PropTypes.string,
  inputClassName: PropTypes.string
}

CustomInput.defaultProps = {
  className: '',
  inputClassName: ''
}

export default CustomInput;
