/**
 * Create by fay on 4/22/20 10:31 下午
 */
import ThemeProvider from '@/components/provider/theme-provider';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react";
import Root from './root';

export default ({children}: any) => {
  
  return (
    <ThemeProvider>
      <CssBaseline />
      <Root>
        {children}
      </Root>
    </ThemeProvider>
  )
};