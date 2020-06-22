import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

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
        <Typography className={classes.title} align="center">看什么看，不许测</Typography>
        {/* <Box>
          <Typography>
            KeyPool是行业领先的专业矿池，为Keystore旗下核心矿池业务，拥有面向机构客户的POS Staking，Filecoin矿池等明星产品。Filecoin
            云算力为KeyPool推出的首款面向终端客户的算力产品，一期预计规模120PB, 旨在让更多的区块链行业爱好者参与到优秀的分布式存储项
            目中共享行业红利。
          </Typography>
        </Box> */}
      </div>
    </div>
  );
};
