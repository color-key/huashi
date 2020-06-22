import React from 'react';
import ProductDetail from './product-detail';
import Services from './services';
import {makeStyles} from "@material-ui/core/styles";
import {BASE_SERVICE_URL} from "@/env";
import {Product} from "@/app/product/index.d";
import {getJson} from '@fay-react/lib/fetch';
import {getQueryString} from '@fay-react/lib/router';

const useStyles = makeStyles(() => ({
  root: {

  },
}));

export default () => {
  const classes = useStyles();
  const [product, setProduct] = React.useState<Product>();

  React.useEffect(() => {
    getJson({path: BASE_SERVICE_URL+'/no-auth/product/detail/'+getQueryString("id")}).then((res) => {
      console.log(res);
      if(res.status === 0){
        setProduct(res.detail);
      }else{
        // error
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      {
        product &&
        <>
          <ProductDetail data={product}/>
          <Services/>
        </>
      }
    </div>
  )
}