import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export const custom = {
  primary: {
    dark: '#331212',
    main: '#401817',
    light: '#5A2120',
  },
  secondary: {
    main: '#ECDAAA',
    dark: '#D1C19A',
    light: '#FFEFC9',
  },
  white: '#F2F2F2',
};

const palette = {
  black,
  white,
  custom,
  primary: {
    contrastText: custom.white,
    dark: custom.primary.dark,
    main: custom.primary.main,
    light: custom.primary.light,
  },
  secondary: {
    contrastText: custom.white,
    dark: custom.secondary.dark,
    main: custom.secondary.main,
    light: custom.secondary.light,
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
    primary: black,
    secondary: black,
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: custom.primary.main,
  background: {
    default: custom.white,
    paper: white,
  },
  divider: custom.primary.light,
};

export default palette