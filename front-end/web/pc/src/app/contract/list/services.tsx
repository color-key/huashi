import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../card';
import {Contract} from '../index.d';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_SERVICE_URL} from '@/env';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(9.25),
    paddingBottom: theme.spacing(9.25),
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: 1200,
  },
  title1: {
    fontSize: '3.5rem',
    fontWeight: 'bold'
  },
  title2: {
    marginTop: '40px',
    fontSize: '1.875rem'
  },
  title3: {
    marginTop: '39px',
    display: 'flex',
    justifyContent: 'center'
  },
  title3Content: {
    width: 136,
    height: 4,
    background: theme.palette.primary.main
  },
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = React.useState<Contract[]>([]);

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL + '/hold/list'}).then(res => {
      if(res.status === 0){
        setData(res.record);
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          data.length ? data.map((item, i) => {
            return (
              <Card key={i} data={item}/>
            )
          }) : <Box textAlign='center'><Typography>暂无数据</Typography></Box>
        }
      </div>
    </div>
  );
};
