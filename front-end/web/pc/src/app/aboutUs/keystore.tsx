import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  content: {
    width: 1200,
  },
  title: {
    padding: theme.spacing(4, 0),
    fontWeight: 500,
    fontSize: '2rem'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.title}>关于Keystore</Typography>
        <Box>
          <Typography>
            Keystore Group成立于2018年，是亚太地区领先的加密资产服务商，为机构客户提供银行级别的加密资产存管和网银支付服务，共服务超
            过百家知名投资机构、交易所、项目方和矿业公司，包括分布式资本、NGC Ventures、Ledger Capital等，旗下产品包括Keystore Custody、
            KeyPay、KeyPool等。
          </Typography>
        </Box>
      </div>
    </div>
  );
};
