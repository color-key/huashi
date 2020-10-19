import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {UserType} from './index';

const seletors = [{
  text: '通过',
  value: 'PASS'
}, {
  text: '拒绝',
  value: 'REJECT'
}];

const useStyles = makeStyles({
  container: {
    width: 300,
    padding: 20 
  },
});

export interface Props {
  open: boolean;
  onClose: (id?: number, value?: string) => void;
  data: UserType|null
}

export default (props: Props) => {
  const classes = useStyles();
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose(data!.id, value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>用户审核</DialogTitle>
      <div className={classes.container}>
        <List>
          {seletors.map((seletor) => (
            <ListItem key={seletor.value} button onClick={() => handleListItemClick(seletor.value)}>
              <ListItemText primary={seletor.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
}
