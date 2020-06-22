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
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center"
  
  },
  box: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  item: {
    width: 384,
    height: 483
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
    width: 320,
    height: 180
  }
}));

const data = [{
  imgSrc: `${PATH_PREFIX}/static/home/1-1.png`,
  title: "一个去中心化的存储网络",
  desc: "Filecoin是协议实验室推出的明星项目，2015年5月发布IPFS后，同年7月他们就发布Filecoin的首版白皮书，Filecoin就是为成就IPFS而生的。这种去中心化的存储网络可以极大的提高用户访问互联网的速度，而且使用成本更低，数据更安全。"
},{
  imgSrc: `${PATH_PREFIX}/static/home/1-2.png`,
  title: "一种Token激励机制",
  desc: "新一代互联网通信协议IPFS的激励机制，矿工通过提供数据存储和检索获得区块奖励和手续费FIL。FIL代币总共发行20亿枚，Filecoin矿工奖励的FIL比例为70％，即矿工可挖FIL数量14亿枚，而头矿第一年将有1.52亿枚的FIL可通过挖矿释放。根据FIL每6年减半的释放规则，且第一个6年分发一半，可挖出的FIL数量最多。"
},{
  imgSrc: `${PATH_PREFIX}/static/home/1-3.png`,
  title: "一个极受关注的区块链项目",
  desc: "2017年共完成募资2.57亿美金，创下了全球区块链早期项目的融资记录。主要投资机构和投资人包括Y Combinator、文克莱沃斯兄弟、红杉资本、DCG斯坦福大学、安德森·霍洛维茨基金、FC新兴网络股权众筹机构、联合广场风投等。"
}];

export default () => {
  const classes = useStyles();

  return (
    <ContentBox className={classes.root}>
      <ViewGrow>
        <Box pb ={6}>
          <Typography className={classes.title1}>Filecoin是什么？</Typography>
        </Box>
      </ViewGrow>
      <Box className={classes.box}>
        {
          data.map((item, index) => {
            return (
              <ViewGrow key={index}>
                <Box p={4} className={classes.item}>
                  <img src={item.imgSrc} className={classes.img}/>
                  <Box pt={3} pb={2}>
                    <Typography className={classes.title2}>{item.title}</Typography>
                  </Box>
                  <Typography variant={"body2"} align={"left"}>
                    {item.desc}
                  </Typography>
                </Box>
              </ViewGrow> 
              
            )
          })
        }
      </Box>
    </ContentBox>
  )
}