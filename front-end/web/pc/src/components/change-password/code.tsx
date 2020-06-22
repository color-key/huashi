import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import clsx from 'clsx';
import Dialog from "@/components/dialog/dialog";
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import PWInput from '@/components/text-field/password-text-field';
import { pwRules } from '@/components/text-field/password-text-field/code';

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
      fontWeight: 500,
      fontSize: '0.875rem',
      height: 56,
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    },
    code: {
      width: '100%',
      height: 56,
    },
    codeBottom: {
      marginBottom: theme.spacing(2),
    },
    img: {
      width: 24,
      height: 24,
      color: grey[600]
    }
  })
);
interface Props {
  open: boolean;
  requestId: number;
  result?: Function;
  onClose: (() => void) | undefined;
}

export default ({ requestId, result, open, ...props}: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleError = () => setError('');
  const [values, setValues] = React.useState({
    oldPassword: '',
    newPassword: '',
    requestId
  });
  React.useEffect(() => {
    setValues({...values, oldPassword: '', newPassword: ''});
  }, [open])
  const handleOldPWChange = (e: any) => setValues({ ...values, oldPassword: e});
  const handleNewPWChange = (e: any) => setValues({ ...values, newPassword: e});

  const handleSubmit = () => {
    if (!values.oldPassword) {
      setError('请输入旧密码');
      return;
    }
    if (!values.newPassword) {
      setError('请输入新密码');
      return;
    }
    if (!pwRules(values.newPassword)) {
      setError('密码8-20位，必须包含数字、字母和字符中的两种');
      return;
    }
    setLoading(true);
    const newValue={...values, requestId}
    postJson({
      path: BASE_URL + '/updatePassWord',
      data: newValue
    })
    .then((res) => {
      setLoading(false);
      if (res.status === 0) {
        if (result) result(requestId);
      } else {
        setError(res.message);
      }
    })
  }

  return (
    <Dialog 
      open={open} 
      onClose={props.onClose}
      footer
      buttonVariant={['submit']}
      onError={handleError}
      onKnow={handleError}
      errorText={error.length>0?error:undefined}
      submitText={'确认'}
      onSubmit={handleSubmit}
      loading={loading}>
      <div className={clsx(classes.root, classes.center)}>
        <div className={classes.head}>修改密码</div>
        <div className={classes.tip}>密码8-20位，至少有数字、字母和字符中的两种</div>
        <PWInput label={'请输入旧的密码'} onChange={handleOldPWChange} />
        <div className={classes.codeBottom}/>
        <PWInput label={'请输入新的密码'} onChange={handleNewPWChange} />
      </div>
    </Dialog>
    )
}