import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {getQueryString} from '@fay-react/lib/router';

const useStyles = makeStyles(() => ({
  root: {
    '& img':{
      width: 200
    }
  },
}))

export default () => {
  const classes = useStyles();
  const [id, setId] = React.useState<string|null>(null);

  React.useEffect(() => {
    const id = getQueryString('id');
    setId(id);
  },[]);

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={1}></Grid>
      {
        id && 
        <Grid container item xs={10}>
          <Grid container justify={"center"} item xs={4}>
            <img src={'/face/'+id+'/face2'}/>
          </Grid>
          <Grid container justify={"center"} item xs={4}>
            <img src={'/face/'+id+'/face1'}/>
          </Grid>
          <Grid container justify={"center"} item xs={4}>
            <img src={'/face/'+id+'/face3'}/>
          </Grid>
        </Grid>
      }
      <Grid item xs={1}></Grid>
    </Grid>
  )
}