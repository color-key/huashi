import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import FilterIcon from '@material-ui/icons/Filter';
import ExploreIcon from '@material-ui/icons/Explore';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
// import {PATH_PREFIX} from '@/env';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8, 0),
    display: 'flex',
    justifyContent: 'center'
  },
  btn: {
    width: 1200,
    display: 'flex',
    padding: theme.spacing(0, 0)
  },
  content: {
    width: 380,
    marginRight: theme.spacing(3)
  },
  cardArea: {
    display: 'flex',
    padding: theme.spacing(3.5, 4),
    justifyContent: 'space-between'
  },
  typography: {
    marginTop: theme.spacing(0.75),
    fontSize: '1.5rem',
    fontWeight: 500
  }
}));

const data = [{
  icon: FilterIcon,
  text: '资讯动态',
  path: '/news'
}, {
  icon: ExploreIcon,
  text: '新手引导',
  path: '/guide'
}, {
  icon: HeadsetMicIcon,
  text: '客户服务',
}]

export default () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <div className={classes.btn}>
        {
          data.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid key={index} item className={classes.content} onClick={() => router.push(router.pathname+ item.path)}>
                <Card variant={"outlined"}>
                  <CardActionArea className={classes.cardArea}>
                    <Typography className={classes.typography}>{item.text}</Typography>
                    <Icon />
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })
        }
      </div>
    </div>
  );
};
