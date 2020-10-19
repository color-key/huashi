import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@/components/text-field";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {SearchStateType} from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default
  },
  btn: {
    height: 40,
    marginLeft: theme.spacing(2)
  }
}));

interface Props{
  onSearch: (args: SearchStateType) => void
}

export default ({onSearch}: Props) => {
  const classes = useStyles();
  const initState = {username: ''};
  const [state, setState] = React.useState<SearchStateType>(initState);

  const handleChange = (key: string) => (e: any) => {
    setState({...state, [key]: e.target.value})
  }

  const handleSearch = () => {
    onSearch(state);
  }

  const handleReset = () => {
    onSearch(initState);
  }

  return (
    <Box className={classes.root}>
      <Grid container item alignItems={"center"}>
        <TextField
          size={"small"}
          label="用户名"
          value={state.username}
          onChange={handleChange('username')}
        />
        <Button className={classes.btn} variant={"contained"} color={"primary"} onClick={handleSearch}>查询</Button>
        <Button className={classes.btn} variant={"contained"} onClick={handleReset}>重置</Button>
      </Grid>
    </Box>
  )
}
