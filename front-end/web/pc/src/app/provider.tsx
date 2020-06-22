/**
 * Create by fay on 4/22/20 10:31 下午
 */
import ThemeProvider from '@/components/provider/theme-provider';
import React from "react";

export default ({children}: any) => {

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
};