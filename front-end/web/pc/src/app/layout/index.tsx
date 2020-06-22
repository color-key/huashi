/**
 * Create by fay on 4/22/20 8:33 上午
 */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from './header'
import Footer from './footer'
import React from 'react';

interface Props{
  children?: React.ReactNode
  header?: boolean
  footer?: boolean
  showNavigation?: boolean
  showPersonal?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.common.white
    },
    footer: {
      width: '100%'
    }
  }),
);

export default ({children, header, footer, showNavigation=true, showPersonal=true}: Props) => {
  const classes = useStyles();

  React.useEffect(() => {
    const internal = setInterval(() => {
      const layoutDom = document.getElementById("layout");
      const layoutFooterDom = document.getElementById("layout-footer");
      const layoutHeight = layoutDom!.offsetHeight;
      const domHeight = document.documentElement.clientHeight;
      if(layoutHeight < domHeight){
        layoutFooterDom!.style.position = "absolute";
        layoutFooterDom!.style.bottom = "0";
      }else{
        layoutFooterDom!.style.position = "static";
      }
    }, 500);
    return () => {
      clearInterval(internal);
    }
  }, []);

  return (
    <div className={classes.root} id={"layout"}>
      {header && <Header showNavigation={showNavigation} showPersonal={showPersonal}/>}
      {children}
      {footer && <div className={classes.footer} id={"layout-footer"}><Footer/></div>}
    </div>
  )
}