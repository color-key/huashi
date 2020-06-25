import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Search from './search';
import Tabs from './tabs';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState<SearchStateType>({nickName: ''});

  const handleSearch = (searchState: SearchStateType) => {
    setState(searchState);
  }

  return (
    <div className={classes.root}>
      <Search onSearch={handleSearch}/>
      <Tabs search={state}/>
    </div>
  )
}

export interface SearchStateType {
  nickName: string
}

export interface UserType{
  id: number
  nickName: string
  avatarUrl: string,
  gender: number,
  country: string,
  province: string,
  city: string,
  language: string,
  openid: string,
  creation_datetime: string,
  mobile: number,
  name: string,
  open_id: string,
  address: string|null,
  status: 'PENDING' | 'PASS' | 'REJECT'
}