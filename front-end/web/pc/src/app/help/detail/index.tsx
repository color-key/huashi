import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Theme } from "@/components/theme";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headContainer: {
    width: 1200,
    padding: theme.spacing(1.75, 0)
  },
  head: {
    display: 'flex'
  },
  headLink: {
    color: theme.colors.deepGrey,
    fontSize: '0.875rem'
  },
  headSpace: {
    color: theme.colors.deepGrey,
    fontSize: '0.875rem',
    margin: theme.spacing(0, 0.5, 0, 1),
  },
  headDes: {
    marginLeft: theme.spacing(0.5),
    color: '#212121',
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  fullWidth: {
    width: '100%'
  },
  title: {
    width: 1200,
    color: '#212121',
    fontSize: '2rem',
    margin: theme.spacing(8, 0, 1.5)
  },
  author: {
    width: 1200,
    color: theme.colors.deepGrey,
    fontSize: '1rem',
    marginBottom: theme.spacing(5)
  },
  des: {
    width: 1200,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(8)
  }
}))

export default () => {
  const classes = useStyles({});
  const router = useRouter();
  const { query: { path = '' } } = router;
  const basePath = router.pathname.replace('/detail', '');
  const secPath = router.pathname.replace('/detail', `/${path}`);
  return (
    <div className={classes.root}>
      <div className={classes.headContainer}>
        <Box className={classes.head}>
          <Link href={basePath} variant="inherit" className={classes.headLink}>帮助中心</Link>
          <Typography className={classes.headSpace}>/</Typography>
          <Link href={secPath} variant="inherit" className={classes.headLink}>{path === 'news' ? '资讯动态' : '新手引导'}</Link>
          <Typography className={classes.headSpace}>/</Typography>
          <Typography className={classes.headDes}>详情页</Typography>
        </Box>
      </div>
      <Divider className={classes.fullWidth} />
      <Typography className={classes.title}>全方位解读IPFS生态圈：未来，因IPFS充满无限可能</Typography>
      <Typography className={classes.author}>作者：keypool运营团队  时间：2020-06-21</Typography>
      <Typography className={classes.des}>{'区块链硬盘挖矿生态中， \
      IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的假设这给予了PoC生态无限的想象空间。 \
      IPFS的基础概念 一、IPFS是什么？ IPFS，中文翻译“星际文件”（Inter Planetary File System），\
      是一种点对点（P2P）的分布式文件存储协议。这样的表达依旧十分抽象，我来举个例子你就明白了。在应用场景中，\
      “IPFS”对标的是一个叫“HTTP”的东西，这你可能比较熟悉，当你上网打开百度搜索页面时，它所见即所得。这个名叫“超文本传输协议”的家伙，\
      是通过你输入的网址，来调取匹配其中心化数据库的内容，达到信息内容访问的目的。 言简意赅地说： HTTP和IPFS 的关系就好比“中心化存储”与“分布式存储”一样，\
      HTTP依赖中心化服务器，容易遭受攻击，访问量暴增服务器容易宕机，下载速度慢，存储成本高；而IPFS是分布式节点，更加安全不易被DDoS攻击，不依赖主干网，降低存储成本且存储空间大，\
      下载速度快还能查找文件历史版本记录，并且理论上能永久储存。 二、IPFS应用场景如何？ IPFS的应用场景是这样的： \
      1、如果你有1G的硬盘空闲空间，可以通过将此硬盘接入IPFS的网络变成其中节点，完成硬盘空间共享；\
       2、这时你就可以上传歌曲、电影于IPFS共享网络中，它们将被“打碎”成二进制的数据字节，散布于IPFS网络其他各个节点之上（共享空间）； \
       3、当他人想下载你上传的视频影音文件时，只需在IPFS的网络完成内容检索，便可从存有该文件的“碎片”节点上，下载还原到本地，\
       这就类似于BitTorrent（求种子）下载，下载的人越多，节点基数越大，资源就越丰富，下载速度也就越快； 4、不容易被删除，信息保存安全。\
       即使你将原始文件从上传节点中删除，只要曾经有人下载过，便将在网络中继续留存。由于IPFS使用了哈希加密算法，\
       也使保证了保存在整个IPFS网络中的所有数据的安全性。 IPFS能为我们改变什么？'}</Typography>
    </div>
  )
}