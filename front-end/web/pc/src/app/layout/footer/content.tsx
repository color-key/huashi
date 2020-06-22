import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LogoIcon from '@/components/icons/logo/logo2';
import WeiboIcon from '@/components/icons/social-platform/weibo';
import WeixinIcon from '@/components/icons/social-platform/weixin';
import Box from '@material-ui/core/Box';
import ContentBox from '@/components/content-box';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[500],
    background: `${theme.palette.common.black}F2`,
    padding: theme.spacing(3.5, 8, 3.5, 8),
  },
  content: {
    display: 'flex',
    justifyContent: "space-between",
  },
  left: {
    display: 'flex',
    alignItems: "center",
  },
  logoBtn: {
    marginRight: theme.spacing(8),
  },
  logo: {
    width: 192,
    height: 40,
    color: theme.palette.grey[500],
  },
  aboutUs: {
    marginRight: theme.spacing(8),
    fontSize: "1rem",
    color: theme.palette.grey[500],
  },
  service: {
    marginRight: theme.spacing(8),
    fontSize: "1rem",
    color: theme.palette.grey[500],
  },
  right: {
    display: 'flex',
    alignItems: "center",
  },
  icon: {
    fontSize: "2rem",
    color: theme.palette.grey[500],
  },
  tooltipWidth: {
    maxWidth: 140,
    height: 130
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <ContentBox className={classes.root}>
      <Box className={classes.content}>
        <div className={classes.left}>
          <Button onClick={() => Router.push(PATH_PREFIX + '/')} className={classes.logoBtn}><LogoIcon className={classes.logo}/></Button>
          <Button onClick={() => Router.push(PATH_PREFIX + '/aboutUs')} className={classes.aboutUs}>关于我们</Button>
          <Button onClick={() => Router.push(PATH_PREFIX + '/service-agreement')} className={classes.service}>服务协议</Button>
        </div>
        <div className={classes.right}>
          <Box ml={4}>
            <Tooltip
              title={<div><img src={PATH_PREFIX+'/static/qrcode/weibo.png'} width={120}/></div>}
              arrow
              placement={"top"}
              classes={{ tooltip: classes.tooltipWidth }}
            >
              <Button><WeiboIcon className={classes.icon}/></Button>
            </Tooltip>
          </Box>
          <Box ml={4}>
            <Tooltip
              title={<div><img src={PATH_PREFIX+'/static/qrcode/wechat.png'} width={120}/></div>}
              arrow
              placement={"top"}
              classes={{ tooltip: classes.tooltipWidth }}
            >
              <Button><WeixinIcon className={classes.icon}/></Button>
            </Tooltip>
          </Box>
        </div>
      </Box>
    </ContentBox>
  );
};
