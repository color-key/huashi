import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 1200,
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      fontWeight: 500,
      fontSize: '2rem'
    },
    listItem: {
      alignItems: "flex-start",
      padding: theme.spacing(2, 3)
    },
    right: {
      width: 73,
      marginTop: theme.spacing(1)
    },
    rightPrimary: {
      fontSize: '0.75rem',
      color: theme.palette.grey[500]
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
  label: '“IPFS”是什么？',
}, {
  label: '“IPFS”是如何对标HTTP的',
}, {
  label: '“IPFS”的技术架构',
}]

export default () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Box className={classes.root} pt={1.5} pl={2} pr={2} pb={1}>
      <Typography className={classes.title}>新手引导</Typography>
      <List component="nav">
        {
          data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ListItem button disableGutters className={classes.listItem} onClick={() => router.push({pathname: router.pathname + '/detail', query: {path: 'guide'}})}>
                  <ListItemText primary={(index + 1) + '、' + item.label} className={classes.title}/>
                  <Box>
                    <KeyboardArrowRight />
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })
        }
      </List>
      <Box className={classes.bottom}>
        <Button color={"primary"} variant={"outlined"} size={"small"} className={classes.btnSpac} onClick={() => router.push(router.pathname + '/guide')}>查看更多</Button>
      </Box>
    </Box>
  );
}
