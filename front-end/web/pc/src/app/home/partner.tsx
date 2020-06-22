import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Theme } from '@/components/theme';
import ViewGrow from '@/components/view-grow';
import {PATH_PREFIX} from '@/env';
import ContentBox from '@/components/content-box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0, 13, 0),
    textAlign: "center"
  },
  box: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  item: {
    width: 180,
    height: 64
  },
  title1: {
    fontSize: '2rem',
    fontWeight: 600
  },
  title2: {
    fontSize: '1.25rem',
    fontWeight: 600
  },
  img: {
    width: "100%",
    height: "100%",
  }
}));

const data = [{
  id: '1',
},{
  id: '2',
},{
  id: '3',
},{
  id: '4',
},{
  id: '5',
},{
  id: '6',
},{
  id: '7',
},{
  id: '8',
},{
  id: '9',
},{
  id: '10',
},{
  id: '11',
},{
  id: '12',
},{
  id: '13',
},{
  id: '14',
},{
  id: '15',
},{
  id: '16',
},{
  id: '17',
},{
  id: '18',
},{
  id: '19',
},{
  id: '20',
}];

export default () => {
  const classes = useStyles();

  return (
    <ContentBox className={classes.root}>
      <ViewGrow>
        <Box pb ={6}>
          <Typography className={classes.title1}>合作伙伴</Typography>
        </Box>
      </ViewGrow>
      <Box pr={8} pl={8} className={classes.box}>
        {
          data.map((item, index) => {
            return (
              <ViewGrow key={index}>
                <Box mb={3} mr={3} className={classes.item}>
                  <img src={`${PATH_PREFIX}/static/home/partner/partner-${item.id}.png`} className={classes.img}/>
                </Box>
              </ViewGrow> 
            )
          })
        }
      </Box>
    </ContentBox>
  )
}