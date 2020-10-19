import {useTheme as useMuiTheme, Theme as muiTheme} from "@material-ui/core/styles";

interface MyTheme extends muiTheme{
  charts: {
    color: string,
    series: {
      color: string
    },
    colors: {
      orange: {
        main: string,
        light: string
      },
      skyBlue: {
        main: string,
        light: string
      },
      purple: {
        main: string,
        light: string
      },
      blue: {
        main: string,
        light: string
      },
      cyan: {
        main: string,
        light: string
      },
    }
  },
  colors: {
    blue: string,
    skyBlue: string,
    deepSkyBlue: string,
    green: string,
    red: string,
    orange: string,
    deepOrange: string,
    grey: string,
    deepGrey: string,
    purple: string,
    cyan: string,
  }
}

type useMyTheme = <T = MyTheme>() => T;

export const useTheme: useMyTheme = useMuiTheme;

export type Theme = MyTheme;
