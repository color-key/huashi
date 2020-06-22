import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {PATH_PREFIX} from '@/env';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';

const height = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    height,
    background: `url('${PATH_PREFIX}/static/banner/2.png') no-repeat center`,
    backgroundSize: 'cover'
  },
  content: {
    height,
    color: theme.palette.common.white,
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export default () => {
  const classes = useStyles();
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL + '/hold/total'}).then(res => {
      if(res.status === 0){
        setTotal(res.total);
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant={"h4"}>我的总算力：{total}TB</Typography>
      </div>
    </div>
  );
};
