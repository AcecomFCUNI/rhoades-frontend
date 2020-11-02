import { Tooltip, withStyles } from '@material-ui/core';

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.black,
    color: theme.palette.custom.white,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: 'bold',
  },
}))(Tooltip);

export default CustomTooltip;
