import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from "@material-ui/core/Card";
import { Theme } from '@/components/theme';
import PWInput from '@/components/text-field/password-text-field';
import { pwRules } from '@/components/text-field/password-text-field/code';
import CodeInput from '@/components/text-field/code-text-field';
// import AliSlider from '@/components/ali-slider';
import Input from '@/components/text-field';
import ErrorInput from '@/components/err';
import { getJson, postJson } from '@fay-react/lib/fetch';
import {BASE_URL, PATH_PREFIX} from "@/env";

const useStyles = makeStyles((theme: Theme) =>({
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
  tfTop: {
    margin: theme.spacing(6, 4, 0, 4),
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
  // const [sliderRender, setSliderRender] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const requestId = new Date().getTime();
  const [values, setValues] = React.useState({
    account: '',
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
  const handleAccount = (e: any) => setValues({...values, account: e.target.value, errPhoneText: '', err: ''});
  const handleCodeChange = (e: any) => setValues({ ...values, code: e, err: '',  errCodeText: '',  });
  const handlePWChange = (e: any) => setValues({ ...values, password: e, err: '', errPWText: '' });
  const handleError = () => setValues({ ...values, err: '' });
  const handleForget = async() => {
    setValues({ ...values,errPhoneText: '', errPWText: '', err: '' });
    setLoading(false);
    if (!values.account) {
      setValues({ ...values, errPhoneText: '请输入账号' });
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
    setLoading(true);
    const auth = await accountMfaAuthenticate();
    if (auth) {
      const res = await accountRetrieve();
      if (res) Router.push(PATH_PREFIX + '/forget/succ');
    }
  }
  const accountFind = () => new Promise((resolve) => {
    if (values.account) {
      getJson({ path: BASE_URL + '/no-auth/existUserAccount', data: { account:values.account } })
        .then((resp: any) => {
          if (resp.status === 0) {
            resolve(true);
            setValues({ ...values, aliDialog: false})
          } else {
            resolve(false);
            setValues({ ...values, aliDialog: false, errPhoneText: resp.message });
          }
        })
    }
  })
  const accountMfaAuthenticate = () => new Promise((resolve) => {
    postJson({ path: BASE_URL + '/no-auth/mfaAuthenticate', data: {
      businessType: 'RetrievePassword', 
      mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
      robot: {sessionId: '', sig: '', token: '', scene: ''},
      requestId,
      mobile: {
        mobileNo: values.account,
        country: values.country,
        code: values.code
      },
      email: {
        email: values.account,
        code: values.code
      },
      authenticator: {
        code: values.code
      }
    }})
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
          setValues({ ...values, aliDialog: false, err: ''});
        } else {
          resolve(false);
          setValues({ ...values, aliDialog: false, err: resp.message });
        }
      })
  })
  const accountCode = () => new Promise((resolve) => {
    const data = {
      mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
      businessType: "RetrievePassword",
      mobileNo: values.account,
      country: values.country,
      email: values.account
    }
    postJson({ path: BASE_URL + '/no-auth/retrievePassword/mfaSendCode', data })
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
  const accountRetrieve = () => new Promise((resolve) => {
    const data = {
      account: values.account,
      newPassword: values.password,
      requestId,
      mfaType: /@/.test(values.account) ? 'Email' : 'Sms',
      code: values.code
    }
    postJson({ path: BASE_URL + '/no-auth/retrievePassword', data })
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
  const codeRequest = async(fuc: any) => {
    const find = await accountFind();
    if (find) {
      const res = await accountCode();
      if (res) fuc();
    }
  }
  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) handleForget();
  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>找回密码</div>
      <Card className={classes.content}>
        <div className={classes.tfTop}>
          <Input label='请输入您要找回密码的账号' fullWidth onChange={handleAccount} error={values.errPhoneText?.length > 0} helperText={values.errPhoneText}/>
        </div>
        <div className={classes.pwTop}>
          <CodeInput start={false} onClick={codeRequest} helpText={values.errCodeText} onChange={handleCodeChange} codeStyle={values.account?.length ? null : classes.grey} adornStyle={values.account?.length ? null : classes.adron}/>
        </div>
        <div className={classes.pwTop}>
          <PWInput onChange={handlePWChange} errorText={values.errPWText} onKeyUp={handleKeyUp} />
        </div>
        <div className={classes.pwTop}>
          <ErrorInput des={values.err} callback={handleError} />
        </div>
        <div className={classes.loginTop}>
          <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleForget} color={ 'primary'} variant={"contained"}>
            确认
            {loading && <CircularProgress size={28} style={{position: 'absolute'}} />}
          </Button>
        </div>
      </Card>
      <div className={classes.spcBottom}/>
    </div>
  )
}