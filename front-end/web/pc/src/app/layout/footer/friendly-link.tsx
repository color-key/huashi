import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ContentBox from '@/components/content-box';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[500],
    background: theme.palette.common.black,
    padding: theme.spacing(3, 8),
  },
  content: {
    display: 'flex',
    justifyContent: "space-between",
    fontSize: "0.75rem"
  },
  right: {
    display: 'flex',
    alignItems: "flex-end",
  },
  typography: {
    marginRight: theme.spacing(2.5)
  },
  btn: {
    padding: 0,
    minWidth: 'auto',
    color: theme.palette.grey[500],
    marginRight: theme.spacing(2.5),
    fontWeight: 400
  },
  icon: {
    fontSize: "2rem"
  }
}));

const partner = [{
  name: '巴比特',
  url: 'https://www.8btc.com'
},{
  name: '链闻',
  url: 'https://www.chainnews.com'
},{
  name: '金色财经',
  url: 'https://www.jinse.com'
},{
  name: '火星财经',
  url: 'https://www.huoxing24.com'
},{
  name: 'Odaily',
  url: 'https://www.odaily.com'
},{
  name: '星际视界',
  url: 'https://ipfsnews.net'
},{
  name: '币快报',
  url: 'https://www.beekuaibao.com'
}];

const friend = [{
  name: 'Filecoin官网',
  url: 'https://filecoin.io'
},{
  name: 'IPFS中国社区',
  url: 'http://ipfs.cngxjj.com'
},{
  name: 'Filecoin开发测试网',
  url: 'https://filecoin.io/testnet/'
}]

export default () => {
  const classes = useStyles();

  return (
    <ContentBox className={classes.root}>
      <Box className={classes.content}>
        <div>
          <Box>
            <Typography variant={"inherit"} className={classes.typography}>合作媒体：</Typography>
            {
              partner.map((p, index) => <Button key={index} className={classes.btn} onClick={() => window.open(p.url)}>{p.name}</Button>)
            }
          </Box>
          <Box mt={2}>
            <Typography variant={"inherit"} className={classes.typography}>友情链接：</Typography>
            {
              friend.map((p, index) => <Button key={index} className={classes.btn} onClick={() => window.location.href=p.url}>{p.name}</Button>)
            }
          </Box>
        </div>
        <div className={classes.right}>
          <Typography variant={"inherit"}>Copyright © 2019 KEYSTORE GROUP CO., LTD.</Typography>
        </div>
      </Box>
    </ContentBox>
  );
};
