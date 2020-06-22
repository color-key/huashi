import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "@/components/theme";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {PATH_PREFIX} from "@/env";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(4, 0)
  },
  mode: {
    display: "flex",
    marginTop: theme.spacing(3)
  },
  modeBtn: {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    width: 150,
    textAlign: "center",
    marginRight: theme.spacing(2)
  },
  modeBtnActive: {
    border: `1px solid ${theme.palette.primary.main}`
  }
}));

export default () => {
  const classes = useStyles();
  const [mode, setMode] = React.useState(1);

  return (
    <div className={classes.root}>
      <Typography variant={"h5"}>支付方式</Typography>
      <div className={classes.mode}>
        <Paper variant={mode === 1 ? "elevation" : "outlined"} className={clsx(classes.modeBtn, {[classes.modeBtnActive]: mode === 1})} onClick={() => setMode(1)}>
          <img src={`${PATH_PREFIX}/pay/ali/standard.png`} width={100}/>
        </Paper>
        {/*<Paper variant={mode === 2 ? "elevation" : "outlined"} className={clsx(classes.modeBtn, {[classes.modeBtnActive]: mode === 2})} onClick={() => setMode(2)}>*/}
        {/*  <div>*/}
        {/*    <Typography variant={"inherit"}>微信</Typography>*/}
        {/*  </div>*/}
        {/*</Paper>*/}
      </div>
    </div>
  )
}