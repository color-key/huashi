import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from './card';
import {Product} from "./index.d";
import {BASE_SERVICE_URL} from "@/env";
import {getJson} from '@fay-react/lib/fetch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(9.25),
    paddingBottom: theme.spacing(9.25),
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-250px'
  },
  content: {
    width: 1200,
  },
}));

export default () => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/list'}).then((res) => {
      console.log(res);
      if(res.status === 0){
        setProductList(res.records);
      }else{
        // error
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          productList.length === 0 ?
          <Skeleton variant="rect" width={1200} height={388} animation="wave"/>
          :
          productList.map((item, i) => {
            return (
              <Card key={i} data={item} circle={{top: i !== 0, bottom: true}}/>
            )
          })
        }
      </div>
    </div>
  );
};
