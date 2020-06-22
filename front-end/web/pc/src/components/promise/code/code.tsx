import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import Dialog from "@/components/dialog/dialog";
import CodeInput from '@/components/text-field/code-text-field';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    center: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    head: {
      fontSize: '1.25rem',
      color: grey[900],
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    tip: {
      fontSize: '0.875rem',
      color: grey[800],
      marginBottom: theme.spacing(5),
    },
    login: {
      color: 'white',
      height: 56,
      fontWeight: 600,
      fontSize: '0.875rem',
      marginTop: theme.spacing(3),
    },
    err: {
      fontSize: '0.75rem',
      color: red[400]
    },
    error: {
      margin: '2px 14px 0',
      width: '100%',
      color: '#D70D26',
      fontSize: 12,
    },
    grey: {
      color: grey[400],
      '&:hover': {
        color: grey[400],
      },
    },
    adron: {
      '&:hover': {
        backgroundColor: '#FFFFFF',
      }
    }
  })
);
interface Props {
  open: boolean;
  start?: boolean;
  phone?: boolean;
  mobile?: string | null;
  email?: string | null;
  businessType?: string
  result?: Function;
  onClose: (() => void) | undefined;
  errorText?: string;
  mobileCountry?: string;
}

export default ({ open = false, start = false, phone = false, mobile = '', mobileCountry= '', email = '', businessType = '', errorText, result, ...props }: Props) => {
  const classes = useStyles();
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
    setError(errorText ? errorText : '');
  }, [errorText]);
  React.useEffect(() => {
    setSource({
      businessType,
      mfaType: phone ? 'Sms' : 'Email',
      mobileNo: mobile || '',
      country: mobileCountry || '',
      email: email || ''
    })
    setCode('');
    if (open) {
      setSend(true);
    } else {
      setError('')
    }
  }, [open, mobile, email]);

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
      mfaType: phone ? "Sms" : 'Email',
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
  return (
    <Dialog
      open={open}
      onClose={props.onClose}
      footer
      buttonVariant={['submit']}
      onError={handleError}
      onKnow={handleError}
      errorText={error && error.length > 0 ? error : undefined}
      submitText={'确认'}
      onSubmit={handleSubmit}
      loading={loading}>
      <div className={clsx(classes.root, classes.center)}>
        <div className={classes.head}>{`验证${phone ? '手机' : '邮箱'}`}</div>
        <div className={classes.tip}>{`验证码已发送至${phone ? '手机' : '邮箱'}${phone ? mobile : email}，请及时输入`}</div>
        <CodeInput start={send} startFuc={accountCode} onClick={codeRequest} onChange={handleCodeChange} />
      </div>
    </Dialog>
  )
}