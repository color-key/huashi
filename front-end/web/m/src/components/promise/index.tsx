import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@/components/theme';
import Typography from '@material-ui/core/Typography';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CodeInput from '@/components/text-field/code-text-field';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    left: 0,
    top: 0,
    position: 'fixed'
  },
  content: {
    width: '100%',
    // height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: theme.spacing(2, 2, 0, 0),
    paddingBottom: theme.spacing(2.5)
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  topTitle: {
    margin: theme.spacing(3, 0, 4, 2),
    fontWeight: 500,
    fontSize: '1.25rem'
  },
  close: {
    width: 20,
    height: 20,
    margin: theme.spacing(1, 1, 0, 0),
    color: '#E0E0E0'
  },
  pwTop: {
    margin: theme.spacing(0, 2)
  },
  loginTop: {
    margin: theme.spacing(5.5, 2, 0),
  },
  login: {
    height: theme.spacing(6),
    borderRadius: theme.spacing(3.5),
    fontWeight: 500,
    fontSize: '0.875rem',
  },
}))

export default ({onClose, open, result, accountType=true, account, businessType=''}: any) => {
  const classes = useStyles({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [send, setSend] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [source, setSource] = React.useState({
    businessType: '',
    mfaType: '',
    mobileNo: '',
    country: '',
    email: ''
  })
  const requestId = new Date().getTime();
  const handleError = () => setError('');
  React.useEffect(() => {
    setSource({
      businessType,
      mfaType: accountType ? 'Sms' : 'Email',
      mobileNo: account || '',
      country:  '',
      email: account || '',
    })
    setCode('');
    if (open) {
      setSend(true);
    } else {
      setError('')
    }
  }, [open, account]);
  const handleCodeChange = (e: any) => {
    setCode(e);
    handleError();
  }
  const handleSubmit = () => {
    if (!code) {
      setError('请输入验证码');
      return;
    }
    setLoading(true);
    const data = {
      businessType,
      mfaType: accountType ? "Sms" : 'Email',
      requestId,
      mobile: {code},
      email: {code},
    }
    postJson({ path: BASE_URL + '/mfaAuthenticate', data })
      .then((res) => {
        setLoading(false);
        if (res.status === 0) {
          if (result) result(requestId);
        } else if (res.status === 100020) {
          if (result) result(requestId, true);
        } else {
          setError(res.message);
        }
      })
  }
  const codeRequest = async(fuc: any) => {
    const res = await accountCode();
    if (res) fuc();
  }
  const accountCode = () => new Promise((resolve) => {
    postJson({ path: BASE_URL + '/mfaSendCode', data: source })
      .then((resp: any) => {
        setLoading(false);
        if (resp.status === 0) {
          resolve(true);
        } else {
          resolve(false);
          setError(resp.message);
        }
      })
  })





  // React.useEffect(() => {
  //   open && accountCode();
  // },[open])
  // const handleCodeChange = (e: any) => setValues({...values, code: e, errCodeText: ''})
  // const codeRequest = async(fuc: any) => {
  //   const res = await accountCode();
  //   if (res) fuc();
  // }
  // const accountCode = () => new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true);
  //     if (open) {
  //       setSend(true);
  //     }
  //     setValues({...values, errCodeText: ''})
  //   }, 1000);
    // const data = {
    //   businessType,
    //   mfaType: accountType ? 'Sms' : 'Email',
    //   mobileNo: account,
    //   country: '',
    //   email: account
    // }
    // setLoading(true);
    // postJson({ path: BASE_URL + '/mfaSendCode', data })
    //   .then((resp: any) => {
    //     setLoading(false);
    //     if (resp.status === 0) {
    //       resolve(true);
    //       setValues({...values, start: true, errCodeText: ''})
    //     } else {
    //       resolve(false);
    //       setValues({...values, start: false, errCodeText: resp.message});
    //     }
    //   })
  // })
  // const handleAuth = () => {
  //   if (!values.code) {
  //     setValues({...values, errCodeText: '请输入验证码'})
  //     return;
  //   }
  //   setLoading(true);
  //   const data = {
  //     businessType,
  //     mfaType: accountType ? "Sms" : 'Email',
  //     requestId,
  //     mobile: {code: values.code},
  //     email: {code: values.code},
  //   }
  //   postJson({ path: BASE_URL + '/mfaAuthenticate', data })
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.status === 0) {
  //         if (result) result(requestId);
  //       } else if (res.status === 100020) {
  //         if (result) result(requestId, true);
  //       } else {
  //         setValues({...values, errCodeText: res.message})
  //       }
  //     })
  // }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.top}>
            <Typography className={classes.topTitle}>{`请输入您在${accountType ? '手机' : '邮箱'}${account}上收到的验证码`}</Typography>
            <HighlightOff className={classes.close} onClick={onClose}/>
          </div>
          <div className={classes.pwTop}>
            <CodeInput start={send} startFuc={accountCode}  onClick={codeRequest} helpText={error} onChange={handleCodeChange} />
          </div>
          <div className={classes.loginTop}>
            <Button disabled={loading} className={clsx(classes.login)} fullWidth onClick={handleSubmit} color={'primary'} variant={"contained"}>
            <Typography style={{ position: 'absolute' }}>确认</Typography>
            {loading &&
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                <CircularProgress size={28} />
              </div>
            }
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}