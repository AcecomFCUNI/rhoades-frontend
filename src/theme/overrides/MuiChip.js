import { colors } from '@material-ui/core';

const customStyle = {
  root: {
    fontFamily: 'Nunito',
    backgroundColor: colors.blueGrey[50],
    color: colors.blueGrey[900],
  },
  deletable: {
    '&:focus': {
      backgroundColor: colors.blueGrey[100],
    },
  },
};

export default customStyle