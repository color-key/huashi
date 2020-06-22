import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Contract} from '../index.d';
import moment from 'moment';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';

interface Props{
  data: Contract
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: '100%'
  },
  left: {
    display: "flex",
  },
  title1: {
    marginRight: theme.spacing(8)
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

export default ({data}: Props) => {
  const classes: any = useStyles();
  const dueYear = moment(data.product.dueDate)
  const onYear = new Date();
  let day = dueYear.diff(onYear, 'day');
  if (day < 0) day = 0;

  const handleBuy = () => {
    Router.push({
      pathname: PATH_PREFIX + '/contract',
      query: {
        id: data.product.id
      }
    })
  }

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Typography variant={"h5"} className={classes.title1}>
          已购算力：{data.holdUnits}TB
        </Typography>
        <Typography variant={"h5"}>
          距离交付日期：预估 {day} 天
        </Typography>
      </div>
      {
        data.product.remainingUnits > 0 &&
        <Button variant={"outlined"} color={"primary"} onClick={handleBuy}>继续购买</Button>
      }
    </div>
  );
}
