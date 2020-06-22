import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {Product} from "@/app/product/index.d";

interface Props {
  data: Product
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.grey[100],
    width: 614,
    height: 210,
    padding: theme.spacing(3)
  },
  item: {
    display: "inline-block",
    width: "50%",
    height: "50%",
  },
  label: {
    marginTop: theme.spacing(3)
  },
  value: {
    fontSize: '1.25rem',
    marginTop: theme.spacing(1)
  },
  borderTop: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    paddingTop: theme.spacing(3)
  },
  borderLeft: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    paddingLeft: theme.spacing(3)
  },
}));

export default ({data}: Props) => {
  const classes: any = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Typography className={classes.label} variant={"inherit"}>挖矿币种</Typography>
        <Typography className={classes.value}>{data.miningCoinType}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft)}>
        <Typography className={classes.label} variant={"inherit"}>结算周期</Typography>
        <Typography className={classes.value}>T+{data.profitSettlementCycle}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderTop)}>
        <Typography className={classes.label} variant={"inherit"}>合约期限</Typography>
        <Typography className={classes.value}>{data.productCycleDesc}</Typography>
      </div>
      <div className={clsx(classes.item, classes.borderLeft, classes.borderTop)}>
        <Typography className={classes.label} variant={"inherit"}>服务费</Typography>
        <Typography className={classes.value}>{data.serviceFeeDesc}</Typography>
      </div>
    </div>
  );
}
