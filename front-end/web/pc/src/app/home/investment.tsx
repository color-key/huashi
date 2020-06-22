import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme } from '@/components/theme';
import {PATH_PREFIX} from '@/env';
import ContentBox from '@/components/content-box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8),
    backgroundColor: theme.palette.common.black,
    background: `url('${PATH_PREFIX}/static/home/invest-bg.png') no-repeat fixed center`,
    color: theme.palette.common.white,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: '2rem'
  },
  list: {
    marginTop: theme.spacing(3)
  },
  listItem: {
    padding: theme.spacing(4, 5),
  },
  listItemTextPrimary: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  },
  listItemTextSecondary: {
    color: theme.palette.common.white,
  },
  listItemAvatar: {
    minWidth: '110px'
  },
  avatar: {
    width: 72,
    height: 72
  },
  listItemImg: {
    width: 384,
    height: 72,
    border: '1px solid #E0E0E0',
    padding: theme.spacing(1.25),
    textAlign: "center"
  }
}));

const data = [{
  id: 1,
  name: "Bo Shen",
  desc: "分布式资本、gf.network创始人，Bitshares联合创始人"
},{
  id: 2,
  name: "孙铭",
  desc: "世泽律师事务所合伙人、分布式资本、gf.network法律总顾问"
},{
  id: 3,
  name: "Ye Yaming",
  desc: "靖亚资本管理合伙人，携程网前首席技术官兼高级副总裁"
}];

const orgData = [{
  id: 1,
},{
  id: 2,
}];

export default () => {
  const classes = useStyles();

  return (
    <ContentBox p={8} className={classes.root}>
      <Box className={classes.content}>
        <Box>
          <Typography className={classes.title}>投资人</Typography>
          <List className={classes.list}>
            {
              data.map((item) => {
                return (
                  <ListItem key={item.id} className={classes.listItem}>
                    <ListItemAvatar className={classes.listItemAvatar}>
                      <Avatar className={classes.avatar} src={`${PATH_PREFIX}/static/home/invest/${item.id}.png`}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={item.desc}
                      primaryTypographyProps={{className: classes.listItemTextPrimary}}
                      secondaryTypographyProps={{className: classes.listItemTextSecondary}}
                    />
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
        <Box>
          <Typography className={classes.title}>投资机构</Typography>
          <List className={classes.list}>
            {
              orgData.map((item) => {
                return (
                  <ListItem key={item.id} className={classes.listItem}>
                    <div className={classes.listItemImg}>
                      <img src={`${PATH_PREFIX}/static/home/invest/org/${item.id}.png`} height={"100%"}/>
                    </div>
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
      </Box>
    </ContentBox>
  )
}