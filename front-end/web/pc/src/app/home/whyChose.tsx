import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Theme } from '@/components/theme';
import ViewGrow from '@/components/view-grow';
import {PATH_PREFIX} from '@/env';
import SecurityLevel3Icon from '@/components/icons/home/security-level3';
import CloudIcon from '@/components/icons/home/cloud';
import LightningIcon from '@/components/icons/home/lightning';
import NetworkIcon from '@/components/icons/home/network';
import N1Icon from '@/components/icons/home/n+1';
import MonitorIcon from '@/components/icons/home/monitor';
import PublicDataIcon from '@/components/icons/home/public-data';
import OutIcon from '@/components/icons/home/out';
import OsIcon from '@/components/icons/home/os';
import CustomizedSpeedIcon from '@/components/icons/home/customized-speed';
import HardDiskIcon from '@/components/icons/home/hard-disk';
import AmdIcon from '@/components/icons/home/amd';
import MemoryIcon from '@/components/icons/home/memory';
import FaultIcon from '@/components/icons/home/fault';
import DeployIcon from '@/components/icons/home/deploy';
import DebuggerIcon from '@/components/icons/home/debugger';
import UpgradeIcon from '@/components/icons/home/upgrade';
import UpdateIcon from '@/components/icons/home/update';
import clsx from 'clsx';
import ContentBox from '@/components/content-box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(8, 0, 13, 0),
  
  },
  item: {
    display: "flex",
    justifyContent: "center"
  },
  title1: {
    fontSize: '2rem',
    fontWeight: 600,
    textAlign: "center"
  },
  title1Desc: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  title2: {
    fontSize: '1.25rem',
    fontWeight: 600
  },
  img: {
    height: 330,
  },
  itemDesc: {
    background: theme.palette.grey[100]
  },
  itemChildren: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center"
  },
  borderRight: {
    borderRight: `3px solid ${theme.palette.grey[800]}`,
    borderImage: `linear-gradient(${theme.palette.grey[800]},${theme.palette.grey[50]}) 0 30`
  },
  borderLeft: {
    borderLeft: `3px solid ${theme.palette.grey[800]}`,
    borderImage: `linear-gradient(${theme.palette.grey[800]},${theme.palette.grey[50]}) 0 30`
  }
}));

const data = [{
  imgSrc: `${PATH_PREFIX}/static/home/why/1.png`,
  title: "安全",
  desc: "T4级IDC标准建设，集群化架构灵活管理，算法优化一键升级",
  children: [{
    icon: CloudIcon,
    text: "弹性存储空间"
  },{
    icon: SecurityLevel3Icon,
    text: "三级安全防护"
  },{
    icon: LightningIcon,
    text: "稳定电力供应"
  },{
    icon: NetworkIcon,
    text: "优质网络资源"
  },{
    icon: N1Icon,
    text: "n+1式冗余部署"
  }]
},{
  imgSrc: `${PATH_PREFIX}/static/home/why/2.png`,
  title: "稳定收益",
  desc: "实时查看算力运行及每日收益情况，支持收益即时提取",
  children: [{
    icon: MonitorIcon,
    text: "算力实时监控"
  },{
    icon: PublicDataIcon,
    text: "公开链上数据"
  },{
    icon: OutIcon,
    text: "收益即时提取"
  }]
},{
  imgSrc: `${PATH_PREFIX}/static/home/why/3.png`,
  title: "可拓展，高性能",
  desc: "搭载自主研发的Marlin OS及KeyPool定制加速硬件，配备企业级硬盘，服务器级处理器及内存，深度优化挖矿稳定和效率",
  children: [{
    icon: OsIcon,
    text: "Marlin OS"
  },{
    icon: CustomizedSpeedIcon,
    text: "定制加速硬件"
  },{
    icon: HardDiskIcon,
    text: "企业级硬盘"
  },{
    icon: AmdIcon,
    text: "AMD Infinity"
  },{
    icon: MemoryIcon,
    text: "服务器级内存"
  }]
},{
  imgSrc: `${PATH_PREFIX}/static/home/why/4.png`,
  title: "专业运维",
  desc: "专业运营团队7*24管理，全方位数据监控，软硬件及时升级",
  children: [{
    icon: FaultIcon,
    text: "故障排除"
  },{
    icon: DeployIcon,
    text: "网络部署"
  },{
    icon: DebuggerIcon,
    text: "安装调试"
  },{
    icon: UpgradeIcon,
    text: "软件升级"
  },{
    icon: UpdateIcon,
    text: "硬件更新"
  }]
}];

export default () => {
  const classes = useStyles();

  return (
    <ContentBox className={classes.root}>
      <ViewGrow>
        <Box>
          <Box pb ={2}>
            <Typography className={classes.title1}>为什么要选择Keypool云算力</Typography>
          </Box>
          <Box pb ={8} className={classes.title1Desc}>
            <Typography>
              KeyPool是由资深区块链金融产品研发人员，边缘计算及数据存储专家打造的基于Filecoin网络的技术服务平台，我们与国内多家Tier4级IDC紧密合作,  最大程度地规避机房设备中任何服务中断，充分保障稳定的挖矿收益和存储服务。同时承载KeyPool自主研发的Filecoin集群化部署算法方案, 软硬件协同设计，深度提升挖矿效率，优化用户体验。我们希望通过从网络资源部署到用户收益的层层把关，让用户实现稳健而高效的品质挖矿。
            </Typography>
          </Box>
        </Box>
      </ViewGrow>
      <div>
        {
          data.map((item, index) => {
            return (
              <Box key={index} p={4} className={classes.item}>
                <Grid container spacing={3} direction={index%2 === 0 ? "row" : "row-reverse"}>
                  <Grid container item xs={6} alignItems={"center"} justify="center">
                    <ViewGrow>
                      <img src={item.imgSrc} className={classes.img}/>
                    </ViewGrow>
                  </Grid>
                  <Grid item xs={6} container alignItems={"center"} justify="center">
                    <ViewGrow>
                      <Box pt={4} pb={4} pl={4} pr={1.5} className={clsx(classes.itemDesc, {[classes.borderLeft]: index%2 === 0, [classes.borderRight]: index%2 !== 0})}>
                        <Box pb={1}>
                          <Typography className={classes.title2}>{item.title}</Typography>
                        </Box>
                        <Typography variant={"body2"} align={"left"}>
                          {item.desc}
                        </Typography>
                        <Box className={classes.itemChildren}>
                          {
                            item.children.map((item2, index2) => {
                              const Icon = item2.icon;
                              return (
                                <Box key={index2} mt={5} ml={4} mr={6.5}>
                                  <Icon/>
                                  <Typography variant={"body2"}>{item2.text}</Typography>
                                </Box>
                              )
                            })
                          }
                        </Box>
                      </Box>
                    </ViewGrow>
                  </Grid>
                </Grid>
              </Box>
            )
          })
        }
      </div>
    </ContentBox>
  )
}