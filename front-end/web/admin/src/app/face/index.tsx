import React from 'react';
import T3D from './3D';
import GTLF3D from './GTLF3D';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Img from './img';
import {getQueryString} from '@fay-react/lib/router';
import {get} from '@fay-react/lib/fetch';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(4, 2),
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    flexFlow: 'column'
  },
  container: {
    width: 500,
  }
}))

export default () => {
  const classes = useStyles();
  const [obj, setObj] = React.useState(false);
  const [gltf, setGltf] = React.useState(false);

  React.useEffect(() => {
    const title = document.title;
    document.title = "人脸3D头像";
    const id = getQueryString('id');
    get({path: '/face/'+id+'/face.gltf'}).then(res => {
      if(res.status === 200){
        setGltf(true);
      }else{
        setObj(true);
      }
    });
    return () => {
      document.title = title;
    }
  },[]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {obj && <T3D/>}
        {gltf && <GTLF3D/>}
      </div>
      <Img/>
    </div>
  )
}