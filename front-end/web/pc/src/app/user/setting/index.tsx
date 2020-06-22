import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import { PATH_PREFIX, BASE_URL } from '@/env';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import { getJson } from '@fay-react/lib/fetch';
import Promise from '@/components/promise';
import ChangeDialog from '@/components/change-code';
import ChangePasswordDialog from '@/components/change-password';
import PasswordClickDialog from '@/components/pwd-submit';
import {saveUser} from '@fay-react/lib/user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(8, 15),
    justifyContent: "center",
  },
  block: {
    width: '100%',
    height: 90,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${grey[300]}`
  },
  blockNone: {
    borderBottom: 'none'
  },
  piece: {
    flex: 1,
  },
  pieceLeft: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4)
  },
  pieceMiddle: {
    display: 'flex',
    justifyContent: 'center'
  },
  pieceRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(4)
  },
  pieceTitle: {
    fontWeight: 500,
    color: grey[800],
    fontSize: '0.875rem'
  },
  pieceDes: {
    color: grey[600],
    fontSize: '0.75rem'
  },
  pieceBind: {
    color: grey[900],
    fontSize: '0.875rem'
  },
  pieceUnbind: {
    color: grey[600],
    fontSize: '0.875rem'
  },
  borderResp: {
    marginLeft: theme.spacing(2),
    width: 60,
    borderRadius: 4,
  },
  blueBtn: {
    border: `1px solid ${theme.colors.blue}`,
    color: theme.palette.primary.main
  },
  greyBtn: {
    border: `1px solid ${grey[300]}`,
    color: grey[800]
  },
  borderGray: {
    border: `1px solid ${grey[500]}`,
    marginLeft: theme.spacing(2)
  },
  boxImg: {
    marginRight: theme.spacing(2)
  },
  tab: {
    height: 360,
    minWidth: 1200
  },
}));

export default () => {
  const classes = useStyles({});
  const [promise, setPromise] = React.useState({
    auth: false,
    businessType: '',
    requestId: 0,
    selectPhoneEmail: true,
    dialogPhoneEmail: false,
    dialogPassword: false,
    dialogPasswordSure: false,
  })
  const [values, setValues] = React.useState({
    bindEmail: false,
    bindMobile: false,
    email: '',
    mfaAuthenticator: false,
    mfaMobileAuthenticate: false,
    mobileCountry: '',
    mobileNo: '',
    securityLevel: "Low"
  })
  React.useEffect(() => {
    userSettingInfo();
  }, [])

  const userSettingInfo = async () => {
    const res = await getJson({ path: BASE_URL + '/getUserSettingInfo' });
    if (res.status === 0 && res.userSettingInfo) {
      setValues({ ...values, ...res.userSettingInfo });
      userInfo();
      return true
    }
    return false;
  };
  const userInfo = async () => {
    const res = await getJson({ path: BASE_URL + '/getCurrentUserInfo' });
    if (res.status === 0 && res.userInfo) {
      saveUser({...res.userInfo, name: res.loginAccount});
      return true
    }
    return false;
  }
  const handleCancel = () => setPromise({ ...promise, auth: false, dialogPhoneEmail: false, dialogPassword: false, dialogPasswordSure: false })
  const handleStepCodeAuth = (e: any) => {
    if (promise.businessType === 'UpdatePassword') {
      setPromise({ ...promise, businessType: '', auth: false, dialogPhoneEmail: false, dialogPassword: true, requestId: e })
    }
    if (promise.businessType === 'IdentifyChangeMobileNo' || promise.businessType === 'IdentifyBindMobileNo') {
      setPromise({ ...promise, businessType: '', auth: false, selectPhoneEmail: true, dialogPhoneEmail: true, dialogPassword: false, requestId: e })
    }
    if (promise.businessType === 'IdentifyUpdateEmail' || promise.businessType === 'IdentifyBindEmail') {
      setPromise({ ...promise, businessType: '', auth: false, selectPhoneEmail: false, dialogPhoneEmail: true, dialogPassword: false, requestId: e })
    }
  }
  const handlePhone = () => setPromise({ ...promise, auth: true, selectPhoneEmail: true, businessType: values.bindMobile ? 'IdentifyChangeMobileNo' : 'IdentifyBindMobileNo' });
  const handleEmail = () => setPromise({ ...promise, auth: true, selectPhoneEmail: false, businessType: values.bindEmail ? 'IdentifyUpdateEmail' : 'IdentifyBindEmail' });
  const handlePW = () => setPromise({ ...promise, businessType: 'UpdatePassword', auth: true });

  const handleChangePhoneEmail = () => userSettingInfo();
  const pwdChangeSure = () => setPromise({ ...promise, dialogPasswordSure: true });

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        <div className={classes.block}>
          <div className={clsx(classes.piece, classes.pieceLeft)}>
            <Box mr={3}>
              <img src={`${PATH_PREFIX}/static/setting/phone.svg`} width={30} />
            </Box>
            <div>
              <Typography className={classes.pieceTitle}>手机号</Typography>
              <Typography className={classes.pieceDes}>手机号做为登入账号和身份验证号码</Typography>
            </div>
          </div>
          <div className={clsx(classes.piece, classes.pieceMiddle, values.bindMobile ? classes.pieceBind : classes.pieceUnbind)}>
            {values.bindMobile ? values.mobileNo : '尚未绑定'}
          </div>
          <div className={clsx(classes.piece, classes.pieceRight)}>
            <Button className={clsx(classes.borderResp, values.bindMobile ? classes.greyBtn : classes.blueBtn)} onClick={handlePhone}>{values.bindMobile ? '修改' : '绑定'}</Button>
          </div>
        </div>

        <div className={classes.block}>
          <div className={clsx(classes.piece, classes.pieceLeft)}>
            <Box mr={3}>
              <img src={`${PATH_PREFIX}/static/setting/email.svg`} width={30} />
            </Box>
            <div>
              <Typography className={classes.pieceTitle}>邮箱</Typography>
              <Typography className={classes.pieceDes}>邮箱做为登入账号和身份验证号码</Typography>
            </div>
          </div>
          <div className={clsx(classes.piece, classes.pieceMiddle, values.bindEmail ? classes.pieceBind : classes.pieceUnbind)} >{values.bindEmail ? values.email : '尚未绑定'}</div>
          <div className={clsx(classes.piece, classes.pieceRight)}>
            <Button className={clsx(classes.borderResp, values.bindEmail ? classes.greyBtn : classes.blueBtn)} onClick={handleEmail}>{values.bindEmail ? '修改' : '绑定'}</Button>
          </div>
        </div>
        <div className={clsx(classes.block, classes.blockNone)}>
          <div className={clsx(classes.piece, classes.pieceLeft)}>
            <Box mr={3}>
              <img src={`${PATH_PREFIX}/static/setting/secret.svg`} width={30} />
            </Box>
            <div>
              <Typography className={classes.pieceTitle}>登录密码</Typography>
            </div>
          </div>
          <div className={clsx(classes.piece, classes.pieceMiddle)} />
          <div className={clsx(classes.piece, classes.pieceRight)}>
            <Button className={clsx(classes.borderResp, classes.greyBtn)} onClick={handlePW}>修改</Button>
          </div>
        </div>
      </div>
      <Promise auth={promise.auth} businessType={promise.businessType} cancel={handleCancel} callback={handleStepCodeAuth} userInfo={values}/>
      <ChangeDialog open={promise.dialogPhoneEmail} phone={promise.selectPhoneEmail} mobile={values.mobileNo} email={values.email} requestId={promise.requestId} onClose={handleCancel} result={handleChangePhoneEmail} />
      <ChangePasswordDialog open={promise.dialogPassword} onClose={handleCancel} result={pwdChangeSure} requestId={promise.requestId} />
      <PasswordClickDialog open={promise.dialogPasswordSure} onClose={handleCancel} />
    </div>
  )
}