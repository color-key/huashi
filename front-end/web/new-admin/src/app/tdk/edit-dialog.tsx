import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getJson, postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';

export default ({id, open, onClose, onRefresh}: any) => {

  const [tdk, setTdk] = React.useState({title: '', description: '', keywords: '', path: ''});

  const handleConfirm = () => {
    const data = {
      ...tdk,
      id
    }
    postJson({path: BASE_URL+'/tdk/upd', data}).then(res => {
      if(res.success){
        onRefresh();
        onClose();
      }else{
        alert('更新失败');
      }
    })
  }

  const handleChange = (key: string) => (e: any) => {
    setTdk({...tdk, [key]: e.target.value});
  }

  React.useEffect(() => {
    getJson({path: BASE_URL+'/tdk/findById', data: {id}}).then(res => {
      if(res.success && res.result[0]){
        setTdk(res.result[0]);
      }
    })
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="form-dialog-title">编辑TDK</DialogTitle>
      <DialogContent>
        <DialogContentText>
          路由（path）：{tdk.path}
        </DialogContentText>
        <TextField
          margin="dense"
          label="标题（title）"
          fullWidth
          multiline
          value={tdk.title}
          onChange={handleChange('title')}
        />
        <TextField
          margin="dense"
          label="关键词（keywords）"
          fullWidth
          multiline
          value={tdk.keywords}
          onChange={handleChange('keywords')}
        />
        <TextField
          margin="dense"
          label="描述（description）"
          fullWidth
          multiline
          value={tdk.description}
          onChange={handleChange('description')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={handleConfirm} color="primary">
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}
