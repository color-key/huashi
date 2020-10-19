import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Table from './table';
import Search from './search';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();
  const [state, setState] = React.useState<SearchStateType>({username: ''});

  const handleSearch = (searchState: SearchStateType) => {
    setState(searchState);
  }

  return (
    <div className={classes.root}>
      <Search onSearch={handleSearch}/>
      <Table search={state}/>
    </div>
  )
}

export interface SearchStateType {
  username: string
}

export interface ManagerType{
  id: number
  creation_datetime: string
  username: string,
}