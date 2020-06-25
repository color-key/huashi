import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@/components/transition-card";
import TextField from "@/components/text-field";
import Button from '@material-ui/core/Button';
import {PATH_PREFIX, BASE_URL} from '@/env';
import {postJson} from '@fay-react/lib/fetch';
import {saveUser} from '@fay-react/lib/user';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    justifyContent: 'center',
    flexFlow: "column",
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  card: {
    position: 'relative',
    overflow: 'inherit',
  },
  btn: {
    position: 'absolute',
    right: -50,
    width: 100,
    top: 60
  },
  textField: {
    width: 400,
  },
  footer: {
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
    background: `url('${PATH_PREFIX}/static/bg/1x2.png') no-repeat center`,
    backgroundSize: 'cover'
  }
}))

export default () => {
  const classes = useStyles({});
  const [state, setState] = React.useState({username: '', password: ''});
  const [error, setError] = React.useState('');

  const check = () => {
    if(state.username.length === 0){
      setError('请输入用户名')
    }
    if(state.password.length === 0){
      setError('请输入密码')
    }
    return state.username.length > 0 && state.password.length > 0;
  }

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 13) handleLogin();
  }

  const handleLogin = () => {
    if(check()){
      setError('');
      postJson({path: BASE_URL + '/manager/login', data: state}).then(res => {
        console.log(res);
        if(res.success){
          if(res.result.length === 0){
            setError('用户名或密码错误');
          }else{
            const user = res.result[0];
            saveUser(user);
            Router.push(PATH_PREFIX);
          }
        }else{
          setError('用户名或密码错误')
        }
      })
    }
  }

  const handleChange = (key: string) => (e: any) => {
    setState({...state, [key]: e.target.value});
  }
  
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography color={"secondary"}>&nbsp;{error}</Typography>
          <div>
            <TextField
              value={state.username}
              className={classes.textField}
              label="用户名"
              onChange={handleChange('username')}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div>
            <TextField
              value={state.password}
              className={classes.textField}
              label="密码"
              onChange={handleChange('password')}
              onKeyUp={handleKeyUp}
            />
          </div>
          <Button color={"primary"} variant={"contained"} className={classes.btn} onClick={handleLogin}>登录</Button>
        </Card>
      </div>
      <div className={classes.footer}/>
    </div>
  )
}