import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 1200,
      // backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      alignItems: "flex-start",
      padding: theme.spacing(2.5, 3)
    },
    title: {
      fontWeight: 500,
      fontSize: '2rem'
    },
    right: {
      width: 73,
      marginTop: theme.spacing(1)
    },
    rightPrimary: {
      fontSize: '0.75rem',
      color: theme.palette.grey[500]
    },
    rightIcon: {
      textAlign: 'right'
    },
    bottom: {
      padding: theme.spacing(5, 0),
      textAlign: 'center'
    },
    btnSpac: {
      padding: '3px 24px'
    }
  }),
);

const data = [{
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '刚刚'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '今天'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '昨天'
}]

export default function SimpleList() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root} pt={1.5} pl={2} pr={2} pb={1}>
      <Typography className={classes.title}>资讯动态</Typography>
      <List component="nav">
        {
          data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem button disableGutters className={classes.listItem} onClick={() => router.push({pathname: router.pathname + '/detail', query: {path: 'news'}})}>
                  <ListItemText primary={item.title} secondary={item.desc} />
                  <div className={classes.rightIcon}>
                    <ListItemText primary={""} secondary={item.time} secondaryTypographyProps={{ align: "right", className: classes.rightPrimary }} className={classes.right} />
                    <KeyboardArrowRight />
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })
        }
      </List>
      <Box className={classes.bottom}>
        <Button color={"primary"} variant={"outlined"} size={"small"} className={classes.btnSpac} onClick={() => router.push(router.pathname + '/news')}>查看更多</Button>
      </Box>
    </Box>
  );
}
