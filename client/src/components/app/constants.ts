import { createMuiTheme } from '@material-ui/core';

const defaultColorsMU = createMuiTheme({
  palette: {
    primary: {
      main: '#47b49d',
      contrastText: '#fff'
    },
    secondary: {
      main: '#0b3c48',
      contrastText: '#000'
    },
    warning: {
      main: '#f07d39'
    },
    error: {
      main: '#d83a38'
    }
  }
});

export { defaultColorsMU };
