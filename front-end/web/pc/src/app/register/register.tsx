import React from 'react';
import clsx from 'clsx';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import Card from "@material-ui/core/Card";
import TabSwitchInput, { TabSwitch } from '@/components/tab';
import { Theme } from '@/components/theme';
import CountryInput from '@/components/country-input';
import EmailTF from '@/components/text-field/email-text-field';
import PWInput from '@/components/text-field/password-text-field';
import { pwRules } from '@/components/text-field/password-text-field/code';
import CodeInput from '@/components/text-field/code-text-field';
import AliSlider from '@/components/ali-slider';
import ErrorInput from '@/components/err';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL, PATH_PREFIX } from "@/env";

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
    margin: theme.spacing(6, 4, 0, 4),
  },
  pwTop: {
    margin: theme.spacing(3.25, 4, 0, 4),
  },
  loginTop: {
    margin: theme.spacing(3, 4, 0, 4),
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
  agree: {
    display: 'flex',
    margin: theme.spacing(3.5, 4, 0, 4),
  },
  checkBox: {
    padding: 0,
    width: 18,
    height: 18,
    color: grey[300],
    '&.Mui-checked': {
      color: '#0060FF'
    },
  },
  agreeContent: {
    marginLeft: theme.spacing(1),
    color: grey[600],
    fontSize: '0.75rem'
  },
  spcBottom: {
    marginBottom: theme.spacing(15)
  },
  grey: {
    color: grey[400],
    '&:hover': {
      color: grey[400],
    },
  },
  codeStyle: {
    '&:hover': {
      color: '#0060FF',
    },
  },
  adron: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
    }
  }
}))

export default () => {
  const classes = useStyles({});
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
    code: '',
    codeFuc: () => null,
    aliDialog: false,
    check: false,
    errPhoneText: '',
    errCodeText: '',
    errPWText: '',
    err: '',
  });

  const tabChange = (e: any) => {
    setValues({ ...values, tab: e, errPhoneText: '', errCodeText: '', errPWText: '', err: '', });
    setSign({ requestId: 0, sessionId: '', sig: '', token: '', scene: '' });
  };
  const handleCountry = (e: any) => {
    setValues({ ...values, country: e, err: '' });
  }
  const handlePhoneChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, phone: '', err: '' });
      return;
    }
    if (values.country === 'CN' && e.length !== 11) return;
    if (values.country === 'HK' && e.length > 8) return;
    setValues({ ...values, phone: e, err: '', errPhoneText: '' });
  }
  const handleEmailChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, email: '', err: '' });
      return;
    }
    setValues({ ...values, email: e, err: '' });
  }
  const handleCodeChange = (e: any) => setValues({ ...values, code: e, err: '', errCodeText: '' });
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '', errPWText: '' });
  const handleCheckBox = (_event: any, newValue: any) => setValues({ ...values, check: newValue, err: '' });
  const handleRegister = async() => {
    setValues({ ...values, err: '' });
    setLoading(false);
    if (!values.phone && values.tab === TabSwitch.MOBILE) {
      setValues({ ...values, errPhoneText: '手机号码输入有误，请重新输入' });
      return;
    }
    if (!values.email && values.tab === TabSwitch.EMAIL) {
      setValues({ ...values, errPhoneText: 'E-mail输入有误，请重新输入' });
      return;
    }
    if (!values.code) {
      setValues({ ...values, errCodeText: '请输入验证码' });
      return;
    }
    if (!values.password) {
      setValues({ ...values, errPWText: '请输入密码' });
      return;
    }
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-z]|[A-Z]|[0-9]){8,20}$/;
    // const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#~!@$%'\+\*\-:;^_`]+$)[,\.#~!@$%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
    if (!pwRules(values.password)) return;
    if (!values.check) {
      setValues({ ...values, err: '请阅读并勾选《用户协议》和《隐私政策》' });
      return;
    };
    setLoading(true);
    const res = await accountRegister();
    if (res) Router.push(PATH_PREFIX + '/register/succ');
  }

  const handleService = () => window.open('https://www.keystore.com/service.html');
  const handleProtocol = () => window.open('https://www.keystore.com/privacy.html');
  const handleError = () => setValues({ ...values, err: '' });

  const handleLogin = () => Router.push(PATH_PREFIX + '/login');
  const handleClose = () => {
    setValues({ ...values, aliDialog: false })
  }
  const handleSign = async (data: any) => {
    if (!data.sig) {
      setValues({ ...values, err: '请进行人机验证' });
      return;
    }
    setLoading(false);
    const signData = {
      requestId: new Date().getTime(),
      sessionId: data.sessionId,
      sig: data.sig,
      token: data.token,
      scene: data.scene
    }
    setSign(signData);
    setValues({ ...values, aliDialog: false })
    const res = await accountFind();
    if (res) {
      const auth = await accountMfaAuthenticate(signData);
      if (auth) {
        const res = await accountCode();
        if (res) values.codeFuc();
      }
    }
  }
  const codeRequest = (fuc: any) => {
    if (values.phone || values.email) setValues({ ...values, aliDialog: true, codeFuc: fuc });
  }
  const accountFind = () => new Promise((resolve) => {
    if (values.phone || values.email) {
      getJson({ path: BASE_URL + '/no-auth/existUserAccount', data: { account: values.phone || values.email } })
        .then((resp: any) => {
          if (resp.status === 200011) {
            setValues({ ...values, aliDialog: false });
            resolve(true);
          } else {
            resolve(false);
            setValues({ ...values, aliDialog: false, errPhoneText: '账号已存在' })
          }
        })
    }
  })
  const accountMfaAuthenticate = (sign: any) => new Promise((resolve) => {
    console.log(sign);
    postJson({ path: BASE_URL + '/no-auth/register/mfaAuthenticate', data: { robot: sign, businessType: 'Register', mfaType: 'Robot', requestId: sign.requestId } })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
        } else {
          resolve(false);
          setValues({ ...values, errPhoneText: resp.message })
        }
      })
  })
  const accountCode = () => new Promise((resolve) => {
    const data = {
      mfaType: values.tab === TabSwitch.MOBILE ? 'Sms' : 'Email',
      businessType: "Register",
      mobileNo: values.phone,
      country: values.country,
      email: values.email
    }
    postJson({ path: BASE_URL + '/no-auth/register/mfaSendCode', data })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
        } else {
          resolve(false);
          setValues({ ...values, aliDialog: false,  errPhoneText: resp.message })
        }
      })
  })
  const accountRegister = () => new Promise((resolve) => {
    const data = {
      email: {
        email: values.email,
        code: values.code
      },
      mobile: {
        mobileNo: values.phone,
        country: values.country,
        code: values.code
      },
      robot: {
        sessionId: sign.sessionId,
        sig: sign.sig,
        token: sign.token,
        scene: sign.scene
      },
      requestId: sign.requestId,
      password: values.password,
      registerType: values.tab === TabSwitch.MOBILE ? 'Mobile' : 'Email'
    }
    postJson({ path: BASE_URL + '/no-auth/registerUser', data })
      .then((res) => {
        setLoading(false);
        if (res.status === 0) {
          resolve(true);
        } else {
          setValues({ ...values, err: res.message });
          resolve(false);
        }
      })
  })
  return (
    <div className={classes.root}>
      <div className={classes.title}>注册Keypool账号</div>
      <Card className={classes.content}>
        <TabSwitchInput defaultValue={TabSwitch.MOBILE} onChange={tabChange} titleMobile='手机号注册' titleEmail='邮箱注册' />
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
            <div className={classes.tfTop}>
              <EmailTF label={'请输入邮箱'} fullWidth onChange={handleEmailChange} notEmpty={true} errorText={values.errPhoneText} />
            </div>
          )}
        <div className={classes.pwTop}>
          <CodeInput start={false} onClick={codeRequest} helpText={values.errCodeText} onChange={handleCodeChange} codeStyle={(values.phone?.length || values.email?.length) ? null : classes.grey} adornStyle={(values.phone?.length || values.email?.length) ? null : classes.adron}/>
        </div>
        <div className={classes.pwTop}>
          <PWInput onChange={handlePWChange} errorText={values.errPWText} />
        </div>
        <div className={classes.agree}>
          <Checkbox
            checked={values.check}
            onChange={handleCheckBox}
            value="check"
            color="primary"
            className={classes.checkBox}
          />
          <div className={classes.agreeContent}>我已阅读并同意接受<span className={classes.protocol} onClick={handleService}>《用户协议》</span>和<span className={classes.protocol} onClick={handleProtocol}>《隐私政策》</span></div>
        </div>
        <div className={classes.pwTop}>
          <ErrorInput des={values.err} callback={handleError} />
        </div>
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleRegister} color={'primary'} variant={"contained"}>
            注册
            {loading && <CircularProgress size={28} style={{ position: 'absolute' }} />}
          </Button>
          <div className={classes.bottom}>
            <div>已有账号？<span className={classes.protocol} onClick={handleLogin}>立即登录</span></div>
          </div>
        </div>
      </Card>
      <div className={classes.spcBottom}/>
      <AliSlider open={values.aliDialog} onClose={handleClose} callback={handleSign} label={'人机验证滑块'} successText={'验证通过'} />
    </div>
  )
}