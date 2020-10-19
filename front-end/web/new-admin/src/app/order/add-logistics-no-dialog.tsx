import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {OrderType} from './index';

const useStyles = makeStyles({
  container: {
    width: 500,
    padding: 20 
  },
});

export interface Props {
  open: boolean;
  onClose: (id?: number, value?: string) => void;
  data: OrderType|null
}

export default (props: Props) => {
  const classes = useStyles();
  const { onClose, open, data } = props;
  const [value, setValue] = React.useState('');

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onClose(data!.id, value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">填写快递单号</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            autoFocus
            value={value}
            margin="dense"
            label="快递单号"
            type="email"
            fullWidth
            onChange={(e: any) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button disabled={value.length===0} onClick={handleConfirm} color="primary">
            确认
          </Button>
        </DialogActions>
      </Dialog>
  );
}
