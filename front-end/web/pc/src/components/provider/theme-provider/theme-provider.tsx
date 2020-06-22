/**
 * Create by fay on 4/22/20 10:27 下午
 */
import {blue} from '@material-ui/core/colors';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263BE0',
      light: blue[50],
    },
    secondary: {
      main: '#D70D26'
    },
    common: {
      black: '#131313'
    },
    background: {
      default: '#FFFFFF'
    }
  },
  spacing: 8,
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 30px 81px #2121211C',
      },
      rounded: {
        borderRadius: '2px'
      }
    },
    MuiSnackbar: {
      anchorOriginTopRight: {
        '@media (min-width: 600px)': {
          top: '60px',
          left: '200px',
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: "inherit",
        borderRadius: 24
      }
    }
  }
});

const myTheme = {
  charts: {
    color: '#008AFF3D',
    series: {
      color: '#008AFF'
    },
    colors: {
      orange: {
        main: '#FFA200',
        light: '#FFB33A3D'
      },
      skyBlue: {
        main: '#23B4FF',
        light: '#23B4FF3D'
      },
      purple: {
        main: '#B134FF',
        light: '#B134FF3D'
      },
      blue: {
        main: '#4278FF',
        light: '#4278FF3D'
      },
      cyan: {
        main: '#00CDF0',
        light: '#3BFFE33D'
      },
    }
  },
  colors: {
    blue: '#0062FF',
    skyBlue: "#00D2FF",
    deepSkyBlue: "#009DBE",
    green: '#0CC73B',
    red: '#D70D26',
    orange: '#FFA200',
    deepOrange: '#C67E00',
    grey: '#BDBDBD',
    deepGrey: '#757575',
    purple: '#B134FF',
    cyan: '#00CDF0',
  }
};

export default ({children}: any) => {
  return (
    <ThemeProvider theme={{...theme, ...myTheme}}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
};