import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PATH_PREFIX } from '@/env';

const height = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat center`,
    backgroundSize: 'cover',
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
    marginTop: theme.spacing(7),
    fontWeight: 500,
    fontSize: '3rem',
    textAlign: "center"
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>KeyPool | Filecoin云算力服务商</Typography>
      </div>
    </div>
  );
};
