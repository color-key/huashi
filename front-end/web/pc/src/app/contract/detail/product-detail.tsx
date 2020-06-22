import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@/components/theme";
import Typography from "@material-ui/core/Typography";
import BriefDescGrid from '@/app/product/brief-desc-grid';
import Progress from '@/app/product/progress';
import PayMode from './pay-mode';
import Button from "@material-ui/core/Button";
import NumberFormatTextField from "@/components/text-field/number-format-text-field";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Product } from "@/app/product/index.d";
import { BASE_SERVICE_URL, PATH_PREFIX } from '@/env';
import { postJson } from '@fay-react/lib/fetch';
import Router from 'next/router';
import Price from '@/components/text/price';

interface Props {
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
  },
  left: {
    margin: theme.spacing(6.5)
  },
  right: {
    margin: theme.spacing(6.5),
    width: 482
  },
  name: {
    fontSize: '2rem',
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  desc: {
    marginBottom: theme.spacing(4),
  },
  progress: {
    marginTop: theme.spacing(6)
  },
  textField: {
    marginTop: theme.spacing(4),
    width: '100%'
  },
  payBtn: {
    fontSize: '1.1875rem',
    marginTop: theme.spacing(5),
    width: '100%'
  }
}));

export default ({ data }: Props) => {
  const classes = useStyles();
  const min = Math.min(data.minSubscribeUnits, data.remainingUnits);
  const [count, setCount] = React.useState(min);
  const [error, setError] = React.useState('');

  const amount = count * data.pricePerUnit;
  React.useEffect(() => {
   setError('');
  },[])

  const handleCreateOrder = () => {
    postJson({
      path: BASE_SERVICE_URL + '/order/place', data: {
        "orderAmount": amount,
        "orderPricePerUnit": data.pricePerUnit,
        "orderUnits": count,
        "payAmount": amount,
        "productId": data.id
      }
    }).then((res) => {
      if (res.status === 0) {
        setError('')
        Router.push({
          pathname: PATH_PREFIX + "/order/detail",
          query: {
            id: res.orderId
          }
        })
      } else {
        setError(res.message)
      }
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography className={classes.name}>
          {data.name}
        </Typography>
        <Typography color="textSecondary" className={classes.desc}>
          {data.desc}
        </Typography>
        <BriefDescGrid data={data} />
        <Progress data={data} className={classes.progress} />
      </div>
      <div className={classes.right}>
        <Typography className={classes.name} color={"secondary"}>
          总价 <Price value={amount} />
        </Typography>
        <Typography color={"textSecondary"}>
          单价：<Price value={data.pricePerUnit} />/TB
        </Typography>
        <NumberFormatTextField
          value={count}
          className={classes.textField}
          onChange={(e: any) => {
            setCount(e.target.value);
            setError('');
          }}
          label={"数量"}
          InputProps={{
            endAdornment: <InputAdornment position="end">{'TB'}</InputAdornment>,
            inputProps: { decimalSeparator: false, allowNegative: false, max: data.remainingUnits }
          }}
          error={error.length}
          helperText={error}
        />
        <PayMode />
        <Button disabled={count < min || min <= 0} color={"primary"} className={classes.payBtn} variant={"contained"} onClick={handleCreateOrder}>立即购买</Button>
      </div>
    </div>
  )
}