import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@/app/product/card';
import {Product} from "@/app/product/index.d";
import {BASE_SERVICE_URL} from "@/env";
import {getJson} from '@fay-react/lib/fetch';
import ContentBox from '@/components/content-box';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(9.25),
    paddingBottom: theme.spacing(9.25),
  },
}));

export default () => {
  const classes = useStyles();
  const [productList, setProductList] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/list'}).then((res) => {
      console.log(res);
      if(res.status === 0){
        setProductList([res.records[0]]);
      }else{
        // error
      }
    })
  }, []);

  return (
    <ContentBox className={classes.root}>
      {
        productList.length === 0 ?
        <Skeleton variant="rect" width={1200} height={388} animation="wave"/>
        :
        productList.map((item, i) => {
          return (
            <Card key={i} data={item}/>
          )
        })
      }
    </ContentBox>
  );
};
