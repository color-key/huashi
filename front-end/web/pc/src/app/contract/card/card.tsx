import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Progress from '../progress';
import BriefDescGrid from '../brief-desc-grid';
import Header from './header';
import {Contract} from '../index.d';
import Price from '@/components/text/price';

interface Props{
  data: Contract
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    height: 388,
    width: 1200,
    boxShadow: '0px 30px 81px #2121211C',
    border: 'none',
    marginBottom: theme.spacing(8),
    '& .MuiCardContent-root': {
      padding: '40px 48px 31px 48px'
    }
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  title: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progress: {
    marginTop: theme.spacing(4)
  }
}));

export default ({data}: Props) => {
  const classes: any = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Header data={data}/>
        <Divider className={classes.divider}/>
        <div className={classes.title}>
          <div>
            <Typography variant={"h6"}>{data.product.name}</Typography>
            <Typography variant={"inherit"} color={"textSecondary"}>{data.product.desc}</Typography>
          </div>
          <div>
            <Typography>单价：<Price value={data.product.pricePerUnit}/> / TB</Typography>
          </div>
        </div>
        <BriefDescGrid data={data.product}/>
        <Progress className={classes.progress} data={data.product}/>
      </CardContent>
    </Card>
  );
}
