import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2)
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  }
}));

export default ({className}: any) => {
  const classes = useStyles();
  
  return (
    <div className={clsx(classes.root, className)}>
      <Box>
        <Typography className={classes.title}>
          合约概述
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          FIL-IPFS 8TB合约是由牛比特联合FILPool矿池推出的头部矿池Filecoin云算力产品，
          最小认购单位：8TB。认购后用户将获得的收益为个人所拥有的有效算力的产出扣除管理费后所得，收益日结。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          FILPool矿池是由蜘蛛矿机、MineOS分布式存储管理系统及FILPool集群管理系统搭建的专业Filecoin矿池。
          FILPool矿池从Filecoin测试网上线以来算力排名持续位于全网前列。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          FILPool矿池其核心成员有着丰富的存储行业经验，具有同等硬件5倍以上的挖矿效率，专业化运维，安全稳定收益高。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography className={classes.title}>
          算力购买
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          合约库存
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          本次合约总算力为800TB，最小购买10TB
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          认购价格
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          收益的计算和分配
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          人民币计价，为¥1500/TB
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          服务费
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          1%
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          合约收益
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          Keypool云算力合约-001-800TB算力合约根据keyPool矿池的实际收益进行分配。用户完成下单并支付成功，
          【主体名称】将在从Filecoin主网上线Keypool矿池产生收益之日起开始计算算力收益。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          收益结算
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          1. Keypool云算力合约-001-800TB算力合约将根据keyPool矿池的实际收益进行分配。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          2. 本合约的算力所产生的收益以Filecoin的形式发放。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          3. 北京时间00:00结算前一天的合约收益，最终以矿池的收益结算时间为准。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          4. 收益结算公式：用户每天的挖矿收益=用户持有的算力份数÷keyPool矿池总规模×FILPool每天产币量。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          特别说明
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          Keypool云算力合约-001-800TB合约从Filecoin主网上线keyPool矿池产生收益之日起开始计算收益，挖矿收益以Filecoin结算，
          挖矿产出收益T+1自动转入用户账户，其中30%为用户可用Filecoin，剩余70%因为Filecoin的挖矿抵押机制需要冻结抵押。冻结抵押部分的Filecoin在合约到期后T+3日内进行全部释放给用户。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          *所有的规则及收益都是公开透明的，keyPool矿池节点的地址也是公开透明且不可篡改的。keyPool矿池也将按照Filecoin官方既定规则给予算力持有用户分配收益。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          合约终止
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          1. 算力合约有效期自Filecoin主网上线产生收益之日起开始计算。Keypool云算力合约-001-800TB合约有效期最长为3年，
          即本规格的每份8TB合约包含365天的算力空间租赁费用，第二年开始需按照Filecoin主网上线后的币价、挖矿难度以及keyPool矿池实际挖矿成本制定的收费标准缴纳托管费（最高不会超过第一年云算力售价的50%），托管费须于第二年托管服务开始前7天内缴纳，否则算力合约自动失效。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          2. 算力合约终止后，keyPool矿池和【主体名称】不承担算力的技术支持及管理服务等义务。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          3. 由于法律政策、战争、地震、火灾和电力故障等不可抗原因导致矿场无法继续运营时，合约提前终止，keyPool矿池和【主体名称】不承担赔偿责任。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          风险保障
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          1.为保障客户的收益，降低客户挖矿产出风险，keyPool矿池将会为租赁算力合约的用户配置备用矿机，为其提供算力挖矿产出保障。即当矿机出现故障、损坏等情况，导致客户收益受损时，该部分损失由备用矿机收益进行补充。备用矿机的有效期与算力合约的期限相同。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          2.收益到账可能会遇到网络延迟或堵塞现象，keyPool矿池会准备每天收益的两倍作为风险保证金，优先使用保证金垫付用户收益，最大程度避免发生到账延迟情况。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          3.【主体名称】平台对keyPool矿池进行了严苛的尽调，包括但不限于对项目方的矿场、矿机、技术团队及运维团队能力的尽职调查。
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          风险提示
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          1 .Filecoin会发生价格波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致Keypool云算力合约-001-800TB合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。合约发行方对本合约条款保留所有解释权。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          2 .本合同不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。
        </Typography>
      </Box>
      <Box mt={1}>
        <Typography variant={"body2"}>
          3 .用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致收益FIL即Filecoin挖矿行为被叫停、或者禁止的，本合同自动终止，双方不得相互追究责任，由此造成的损失须自行承担，用户已支付的费用概不退还。
        </Typography>
      </Box>
    </div>
  );
}
