import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@/components/dialog';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    head: {
      width: '100%',
      fontSize: '1.25rem',
      color: grey[900],
      fontWeight: 500,
      marginLeft: theme.spacing(2)
    },
    contentMore: {
      margin: theme.spacing(0, 0.5, 3, 0.5),
      padding: theme.spacing(0)
    },
    slider: {
      width: '100%',
      marginTop: theme.spacing(3)
    }
  })
)

export default (({ open, callback, label = '人机验证滑块', successText = '验证通过', ...props }: any) => {
  const classes = useStyles({});
  let c: any;
  React.useEffect(() => {
    c = document && document.getElementById("ali-dom-id");
    if (!c && open) {
      c = document.createElement('script');
      c.type = 'text/javascript';
      c.src = '//g.alicdn.com/sd/nch5/index.js?t=2015052012';
      const s = document.getElementsByTagName('script')[0];
      s && s.parentNode && s.parentNode.insertBefore(c, s);
    }
    if (c) {
      c.onload = () => {
        const ncToken = ["FFFF0N000000000088B3", (new Date()).getTime(), Math.random()].join(':');
        const options = {
          renderTo: "#ali-dom-id",
          appkey: "FFFF0N000000000088B3",
          scene: "nc_login",
          token: ncToken,
          trans: { "key1": "code0" },
          language: "cn",
          timeout: 3000,
          retryTimes: 3,
          callback: (data: any) => {
            callback({ token: ncToken, sessionId: data.csessionid, sig: data.sig, scene: "nc_login" })
          }
        }
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        const nc = NoCaptcha.init(options);
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        NoCaptcha.setEnabled(true);
        nc.reset();
        // tslint:disable-next-line:ban-ts-ignore
        // @ts-ignore
        NoCaptcha.upLang('cn', {
          SLIDER_LABEL: label,
          CHECK_Y: successText,
          ERROR_TITLE: "非常抱歉，出错了..."
        })
      }
    }
  }, [(new Date()).getTime()])
  return (
    <Dialog
      contentStyle={classes.contentMore}
      open={open}
      onClose={props.onClose}
      disableBackdropClick={false}
    >
      <div className={clsx(classes.root, classes.center)}>
        <div className={classes.head}>人机验证</div>
        <div id={"ali-dom-id"} className={classes.slider} />
      </div>
    </Dialog>
  )
})