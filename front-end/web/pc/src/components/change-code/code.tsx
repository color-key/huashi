import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CountryInput from '@/components/country-input';
import { grey, red } from '@material-ui/core/colors';
import clsx from 'clsx';
import Dialog from "@/components/dialog/dialog";
import { postJson } from '@fay-react/lib/fetch';
import CodeInput from '@/components/text-field/code-text-field';
import EmailTF from '@/components/text-field/email-text-field';
import { BASE_URL } from '@/env';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
    },
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    headContent: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    head: {
      fontSize: '1.25rem',
      color: grey[900],
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    headDes: {
      fontSize: '0.875rem',
      color: grey[800],
      marginBottom: theme.spacing(5),
    },
    login: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      height: 56
    },
    adornment: {
      fontSize: '0.875rem',
    },
    code: {
      marginTop: theme.spacing(3.5)
    },
    space: {
      marginBottom: theme.spacing(3.5)
    },
    err: {
      fontSize: '0.75rem',
      color: red[400],
      width: '100%'
    },
    errTop: {
      marginTop: theme.spacing(4.5),
    },
    errTopMore: {
      marginTop: theme.spacing(3),
    },
    tfTop: {
      width: '100%'
      // margin: theme.spacing(0, 4, 0, 4),
    },
  })
);
export default ({ InputLabelProps = {}, inputProps = {}, phone = true, open = false, mobile = '', email = '', requestId = new Date().getTime(), ...props }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleError = () => {
    setError('');
  }
  const [values, setValues] = React.useState({
    email: '',
    phone: '',
    checkRes: false,
    code: '',
    country: 'CN',
  })
  React.useEffect(() => {
    setValues({email: '', phone: '', checkRes: false, code: '', country: 'CN'});
    setError('');
  }, [open])

  const handleCountry = (e: any) => {
    setValues({ ...values, country: e,});
  }
  const handlePhoneChange = (e: any, res: boolean) => {
    if (!res) {
      setValues({ ...values, phone: '', checkRes: false});
      return;
    }
    if (values.country === 'CN' && e.length !== 11) {
      setValues({ ...values, phone: '', checkRes: false});
      return;
    }
    if (values.country === 'HK' && e.length > 8) {
      setValues({ ...values, phone: '', checkRes: false});
      return;
    }
    setValues({ ...values, phone: e, checkRes: true});
    setError('');
  }


  const handleTFChange = (prop: string) => (e: any, v: any) => {
    setValues({ ...values, [prop]: e, checkRes: v })
    handleError();
  }
  const handleCode = (e: any) => {
    if (typeof e === 'string') {
      setValues({ ...values, code: e })
    } else {
      setValues({ ...values, code: e.target.value })
    }
    handleError();
  }

  const handleSubmitCode = () => {
    if (!values.email && !values.phone) {
      setError(`请输入${phone ? '手机号' : '邮箱'}`);
      return;
    }
    if (!values.checkRes) {
      setError(`请输入正确${phone ? '手机号' : '邮箱'}`);
      return;
    }
    if (!values.code) {
      setError('请输入验证码');
      return;
    }
    setLoading(true);
    const data = {
      code: values.code,
      email: values.email,
      mobileNo: values.phone,
      mobilCountry: values.country,
      requestId
    }
    postJson({
      path: BASE_URL + (phone ? (mobile && mobile.length > 0 ? '/changeMobileNo' : '/bindMobileNo') : (email && email.length > 0 ? '/changeEmail' : '/bindEmail')),
      data
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 0) {
          props.onClose();
          props.result();
        } else {
          setError(res.message)
        }
      })
  }
  const accountCode = () => new Promise((resolve) => {
    if (!values.email && !values.phone) {
      setError(`请输入${phone ? '手机号' : '邮箱'}`);
      return;
    }
    if (!values.checkRes) {
      setError(`请输入正确${phone ? '手机号' : '邮箱'}`);
      return;
    }
    const data = {
      businessType: phone ? (mobile && mobile.length > 0 ? 'ChangeMobileNo' : 'BindMobileNo') : (email && email.length > 0 ? 'UpdateEmail' : 'BindEmail'),
      mfaType: phone ? "Sms" : 'Email',
      email: values.email,
      mobileNo: values.phone,
      country: values.country,
    }
    postJson({ path: BASE_URL + '/mfaSendCode', data })
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
  const codeRequest = async (fuc: any) => {
    const res = await accountCode();
    if (res) fuc();
  }
  const children = () => (
    <div className={clsx(classes.root, classes.center)}>
      <div className={classes.headContent}>
        <div className={classes.head}>{phone ? '绑定/更换手机号' : '绑定/更换邮箱'}</div>
        <div className={classes.headDes}>{phone ? '更换后登入账号将改为新的手机号' : '邮箱可以作为登录账号'}</div>
      </div>
      {phone ? (
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
          />

      ) : (
          <EmailTF label="请输入邮箱"
            fullWidth
            onChange={handleTFChange('email')}
            value={values.email}
            notEmpty={true}
          />
        )}
      <div className={classes.space} />
      <CodeInput start={false} onChange={handleCode} onClick={codeRequest} />
    </div>
  )
  return (
    <Dialog
      open={open}
      onClose={props.onClose}
      footer
      buttonVariant={['submit']}
      onError={handleError}
      onKnow={handleError}
      errorText={error.length > 0 ? error : undefined}
      submitText={'确认'}
      onSubmit={handleSubmitCode}
      loading={loading}>
      {children()}
    </Dialog>
  )
}