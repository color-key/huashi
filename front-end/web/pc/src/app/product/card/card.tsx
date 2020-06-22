import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Progress from '../progress';
import clsx from 'clsx';
import Tag from '@/components/tag';
import BriefDescGrid from '../brief-desc-grid';
import {Product} from "@/app/product/index.d";
import Router from 'next/router';
import {PATH_PREFIX} from "@/env";
import AlipayIcon from '@/components/icons/pay/mode/alipay';
// import WeixinIcon from '@/components/icons/pay/mode/weixin';
import Price from '@/components/text/price';
import Chip from '@material-ui/core/Chip';
import {Theme} from '@/components/theme';

interface Props {
  data: Product
  circle?: {
    top: boolean
    bottom: boolean
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    height: 388,
    width: 1200,
    boxShadow: '0px 30px 81px #2121211C',
    border: 'none',
    marginBottom: theme.spacing(10)
  },
  tag: {
    marginTop: '-10px',
    borderRadius: '8px 0px 0px 0px'
  },
  circle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f7f7f7',
    zIndex: 1,
    boxShadow: 'inset 0px 0px 1px #2121211C',
    marginLeft: '695px',
    marginTop: '-15px'
  },
  circleBottom: {
    marginTop: '373px',
    boxShadow: 'inset 0px 0px 30px #2121211C',
    backgroundColor: '#F9F9F9',
  },
  divider: {
    position: 'absolute',
    marginLeft: '710px',
    width: 0,
    borderRight: `1px dashed ${theme.palette.grey[300]}`
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: '40px 48px 31px 48px'
  },
  left: {
    width: 662
  },
  right: {
    width: 393
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: 'center'
  },
  avatar: {
    width: 97,
    height: 97
  },
  lightBlue: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light
  },
  blue: {
    color: '#FFFFFF',
    backgroundColor: theme.palette.primary.main
  },
  icon: {
    fontSize: '2.75rem',
  },
  name: {
    fontSize: '2rem',
    fontWeight: 500,
  },
  title: {
    display: "flex",
    alignItems: "center"
  },
  desc: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  progress: {
    marginTop: theme.spacing(5)
  },
  payMode: {
    fontSize: '0.75rem',
    marginTop: theme.spacing(5),
    display: "flex",
    alignItems: "center",
  },
  payModeIcon: {
    marginLeft: theme.spacing(2),
  },
  payBtn: {
    fontSize: '1.1875rem',
    marginTop: theme.spacing(5),
    width: '100%'
  },
  chip: {
    color: theme.colors.skyBlue,
    borderColor: theme.colors.skyBlue,
    marginLeft: theme.spacing(1)
  },
  chipEmpty: {
    color: theme.palette.grey[500],
    borderColor: theme.palette.grey[500],
    marginLeft: theme.spacing(1)
  }
}));

export default ({data, circle={top: true, bottom: true}}: Props) => {
  const classes: any = useStyles();

  const handleBuy = () => {
    Router.push({
      pathname: PATH_PREFIX + '/contract',
      query: { id: data.id },
    })
  }

  const empty = data.remainingUnits === 0;

  return (
    <>
      <Tag className={classes.tag} color={empty ? "grey": 'skyBlue'}>{empty ? '已下架' : '限量出售'}</Tag>
      <Card className={classes.root} variant="outlined">
        {circle.top && <div className={classes.circle}/>}
        {circle.bottom && <div className={clsx(classes.circle, classes.circleBottom)}/>}
        <Divider orientation={"vertical"} className={classes.divider}/>
        <CardContent className={classes.cardContent}>
          <div className={classes.left}>
            <div className={classes.title}>
              <Typography className={classes.name}>
                {data.name}
              </Typography>
              <Chip className={clsx(classes.chip, {[classes.chipEmpty]: empty})} label="预售" variant="outlined" size={"small"}/>
            </div>
            
            <Typography color="textSecondary" className={classes.desc}>
              {data.desc}
            </Typography>
            <BriefDescGrid data={data}/>
          </div>
          <div className={classes.right}>
            <Typography className={classes.name} color={"secondary"}>
              <Price value={data.pricePerUnit}/> / TB
            </Typography>
            <Progress className={classes.progress} data={data}/>
            <div className={classes.payMode}>
              <Typography variant={"inherit"}>
                支付方式
              </Typography>
              <AlipayIcon className={classes.payModeIcon}/>
              {/* <WeixinIcon className={classes.payModeIcon}/> */}
            </div>
            {!empty && <Button color={"primary"} className={classes.payBtn} variant={"contained"} onClick={handleBuy}>立即购买</Button>}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
