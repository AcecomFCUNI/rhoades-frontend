import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Paper, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paperSelector: {
    width: 300,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

const CustomSelect = (props) => {
  const {
    className,
    label,
    labelId,
    selectId,
    options,
    value,
    onChange,
    selectProps,
    defaultValueEnabled,
    defaultValue,
    defaultValueLabel
  } = props
  const classes = useStyles()

  return (
    <Paper component="form" className={clsx(classes.paperSelector, className)} elevation={0}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          value={value}
          onChange={onChange}
          label={label}
          {...selectProps}
        >
          {
            defaultValueEnabled && <MenuItem value={defaultValue}><i>{defaultValueLabel}</i></MenuItem>
          }
          {options.map(({ label, value }) => <MenuItem key={value} value={value}>
            {label}
          </MenuItem>)}
        </Select>
      </FormControl>
    </Paper>
  )
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  label: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  selectProps: PropTypes.object,
  labelId: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  defaultValueEnabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  defaultValueLabel: PropTypes.any
}

CustomSelect.defaultProps = {
  className: '',
  options: [],
  label: '',
  selectProps: {},
  labelId: 'default-label-id',
  selectId: 'default-select-id',
  defaultValueEnabled: false
}

export default CustomSelect
