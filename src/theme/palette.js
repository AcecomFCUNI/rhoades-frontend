import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export const custom = {
  brown: {
    dark: '#B77A37',
    main: '#d59834',
    light: '#e5a832',
  },
  gray: {
    main: '#2B2E30',
    dark: '#131515',
    light: '#44484B',
  },
  white: '#F2F2F2',
};

export default {
  black,
  white,
  custom,
  primary: {
    contrastText: custom.brown.main,
    dark: custom.gray.dark,
    main: custom.gray.main,
    light: custom.gray.light,
  },
  secondary: {
    contrastText: white,
    dark: custom.brown.dark,
    main: custom.brown.main,
    light: custom.brown.light,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  success: {
    dark: colors.lightGreen[900],
    main: colors.lightGreen[600],
    light: colors.lightGreen[400],
  },
  text: {
    primary: custom.gray.main,
    secondary: custom.gray.main,
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: custom.gray.main,
  background: {
    default: custom.white,
    paper: white,
  },
  divider: custom.gray.light,
};
