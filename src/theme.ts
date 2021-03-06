import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

export const light: ThemeOptions = {
  palette: {
    type: 'light',
  },
};

export const dark: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#BF3A27'
    },
    secondary: {
      main: '#678785'
    }
  },
};