import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TabSwitchInput, { TabSwitch } from '@/components/tab';
import { Theme } from '@/components/theme';
import { grey } from '@material-ui/core/colors';
import Card from "@material-ui/core/Card";
import CountryInput from '@/components/country-input';
import EmailTF from '@/components/text-field/email-text-field';
import PWInput from '@/components/text-field/password-text-field';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import Router from 'next/router'
import ErrorInput from '@/components/err';
import AliSlider from '@/components/ali-slider';
import { postJson } from '@fay-react/lib/fetch';
import { getQueryString } from '@fay-react/lib/router';
import {BASE_URL, PATH_PREFIX} from "@/env";
import {saveUser} from '@fay-react/lib/user';
import OAuth2 from '../oauth2';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontWeight: 500,
    fontSize: '2rem',
    color: grey[900],
    padding: theme.spacing(15, 0, 8, 0)
  },
  content: {
    width: 480,
    // height: 412,
    boxShadow: '0px 5px 5px -3px rgba(33,33,33,0.16),0px 3px 14px 2px rgba(33,33,33,0.08),0px 8px 10px 1px rgba(33,33,33,0.1)',
    margin: '0 auto',
    paddingBottom: theme.spacing(4)
  },
  tfTop: {
    // margin: theme.spacing(6, 4, 0, 4),
    padding: theme.spacing(6, 4, 0, 4),
  },
  pwTop: {
    margin: theme.spacing(3.5, 4, 0, 4),
  },
  emailTop: {
    margin: theme.spacing(6, 4, 0.5, 4),
  },
  loginTop: {
    margin: theme.spacing(6, 4, 0, 4),
  },
  login: {
    height: theme.spacing(6),
    borderRadius: theme.spacing(3.5),
    fontWeight: 500,
    fontSize: '0.875rem',
    backgroundColor: '#263BE0'
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(3),
    color: grey[600],
    fontSize: '0.875rem'
  },
  protocol: {
    fontSize: '0.875rem',
    color: '#008AFF',
    cursor: 'pointer'
  },
  spcBottom: {
    marginBottom: theme.spacing(15)
  }
}))

export default () => {
  const classes = useStyles({});
  // const [sliderRender, setSliderRender] = React.useState(false);
  const [submitOAuth2, setSubmitOAuth2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sign, setSign] = React.useState({
    requestId: 0,
    sessionId: '',
    sig: '',
    token: '',
    scene: ''
  });
  const [values, setValues] = React.useState({
    tab: TabSwitch.MOBILE,
    phone: '',
    email: '',
    password: '',
    country: 'CN',
    showPassword: false,
    sureDialog: false,
    aliDialog: false,
    auth: false,
    errPhoneText: '',
    errEmailText: '',
    errPWText: '',
    err: '',
  });

  const tabChange = (e: any) => {
    setValues({ ...values, tab: e, errPhoneText: '', errEmailText: '', errPWText: '', err: '' });
    setSign({ requestId: 0, sessionId: '', sig: '', token: '', scene: '' });
  }
  const handleCountry = (e: any) => {
    setValues({ ...values, country: e, err: '' });
  }
  const handlePhoneChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    if (values.country === 'CN' && e.length !== 11) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    if (values.country === 'HK' && e.length > 8) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    setValues({ ...values, phone: e, err: '', errPhoneText: '' });
    console.log(sign);
  }
  const handleEmailChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, email: '', err: '' });
      return;
    }
    setValues({ ...values, email: e, err: '', errPhoneText: '' });
  }
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '', errPWText: '' });
  const handleError = () => setValues({ ...values, err: '' });
  const handleLogin = async() => {
    if (!values.phone && values.tab === TabSwitch.MOBILE) {
      setValues({ ...values, errPhoneText: '手机号码输入有误，请重新输入' });
      return;
    }
    if (!values.email && values.tab === TabSwitch.EMAIL) {
      setValues({ ...values, errPhoneText: 'E-mail输入有误，请重新输入' });
      return;
    }
    if (!values.password) {
      setValues({ ...values, errPWText: '请输入密码' });
      return;
    };
    setValues({ ...values, aliDialog: true });
    return;
  }
  const handleForget = () => Router.push(PATH_PREFIX + '/forget');
  const handleRegister = () => Router.push(PATH_PREFIX + '/register');
  const handleClose = () => {
    setValues({ ...values, aliDialog: false })
  }
  const handleSign = async (data: any) => {
    if (!data.sig) {
      setValues({ ...values, err: '请进行人机验证' });
      return;
    }
    const signData = {
      requestId: new Date().getTime(),
      sessionId: data.sessionId,
      sig: data.sig,
      token: data.token,
      scene: data.scene
    }
    setValues({ ...values, aliDialog: false });
    setSign(signData);
    setLoading(false);
    
    const res = await accountLogin(signData);
    console.log(res);
    if(res) setSubmitOAuth2(true);
  }

  const accountLogin = (sign: any) => new Promise((resolve) => {
    const data = {
      email: values.email,
      mobileNo: values.phone,
      country: values.country,
      password: values.password,
      robot: {
        sessionId: sign.sessionId,
        sig: sign.sig,
        token: sign.token,
        scene: sign.scene,
      },
    };
    setLoading(true);
    postJson({ path: values.tab === TabSwitch.MOBILE ? BASE_URL+'/login/mobile' : BASE_URL+ '/login/email', data })
      .then((resp: any) => {
        if (resp.status === 0) {
          saveUser({...resp.userInfo, name: resp.loginAccount});
          setSubmitOAuth2(true);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
          setValues({ ...values, aliDialog: false, err: resp.message })
        }
      })
  })

  const handleChangeOAuth2 = (login: boolean) => {
    setSubmitOAuth2(false);
    setLoading(false);
    if(login){
      let redirectUrl = getQueryString("redirectUrl");
      if(redirectUrl) redirectUrl = decodeURIComponent(redirectUrl).split(window.location.origin)[1];
      Router.replace(redirectUrl || PATH_PREFIX + '/');
    }else{
      setValues({ ...values, err: '登录失败' });
    }
  }
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) handleLogin();
  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>登录Keypool</div>
      <Card className={classes.content}>
        <TabSwitchInput defaultValue={TabSwitch.MOBILE} onChange={tabChange} titleMobile='手机号登录' titleEmail='邮箱登录' />
        {values.tab === TabSwitch.MOBILE ? (
          <CountryInput
            onSelect={handleCountry}
            defaultCountry={values.country}
            onPhone={handlePhoneChange}
            className={{ root: classes.tfTop }}
            defaultPhone={''}
            label={'请输入手机号'}
            emptyErrorText={'请选择联系方式'}
            longErrorText={'输入的信息过长，请检查后重新输入'}
            enterErrorText={'手机号码输入有误，请重新输入'}
            language={/^[a-zA-Z]+$/.test('请输入手机号') ? 'en' : 'zh'}
            showErrorText={values.errPhoneText}
          />
        ) : (
            <div className={classes.emailTop}>
              <EmailTF label={'请输入邮箱'} fullWidth onChange={handleEmailChange} notEmpty={true} errorText={values.errPhoneText} />
            </div>
          )}
        <div className={classes.pwTop}>
          <PWInput onChange={handlePWChange} errorText={values.errPWText} onKeyUp={handleKeyUp}/>
        </div>
        <div className={classes.pwTop}>
          <ErrorInput des={values.err} callback={handleError} />
        </div>
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleLogin} color={'primary'} variant={"contained"}>
            登录
            {loading && <CircularProgress size={28} style={{ position: 'absolute' }} />}
          </Button>
          <div className={classes.bottom}>
            <div>忘记密码？<span className={classes.protocol} onClick={handleForget}>找回密码</span></div>
            <div>还没账号？<span className={classes.protocol} onClick={handleRegister}>立即注册</span></div>
          </div>
        </div>
      </Card>
      <div className={classes.spcBottom}/>
      <AliSlider open={values.aliDialog} onClose={handleClose} callback={handleSign} label={'人机验证滑块'} successText={'验证通过'} />
      <OAuth2 submit={submitOAuth2} onChange={handleChangeOAuth2}/>
    </div>
  )
}