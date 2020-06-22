import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { PATH_PREFIX } from '@/env';

const height = 448;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    // background: `url('${PATH_PREFIX}/banner/bg.png') no-repeat fixed center`,
    // backgroundSize: 'cover'
    backgroundColor: '#131313',
    borderTop: '1px solid rgba(255, 255, 255, 0.24)',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    color: theme.palette.common.white,
    width: 1200,
  },
  title: {
    marginTop: theme.spacing(15),
    width: 1200,
    fontWeight: 500,
    fontSize: '3rem'
  },
  imgContent: {
    width: 120,
    height: 120,
    marginTop: theme.spacing(9),
    padding: theme.spacing(1),
    backgroundColor: '#FFFFFF'
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}> 欢迎来到 KeyPool 帮助中心</Typography>
        <Box className={classes.imgContent}>
          <img src={`${PATH_PREFIX}/static/qrcode/wechat.png`} />
        </Box>
      </div>
    </div>
  );
};
