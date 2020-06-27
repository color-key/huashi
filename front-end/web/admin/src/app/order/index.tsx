import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Tabs from './tabs';
import Search from './search';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

interface Props{
  userId?: string
}

export default ({userId}: Props) => {
  const classes = useStyles();
  const [state, setState] = React.useState<SearchStateType>({orderNo: '', username: ''});

  const handleSearch = (searchState: SearchStateType) => {
    setState(searchState);
  }

  return (
    <div className={classes.root}>
      <Search onSearch={handleSearch}/>
      <Tabs search={state} userId={userId}/>
    </div>
  )
}

export interface SearchStateType {
  orderNo: string
  username: string
}

export interface OrderType{
  id: number
  creation_datetime: string
  active_flag: number,
  deleted_flag: number,
  update_datetime: string,
  axial_left: string,
  axial_right: string,
  cyl_mirror_left: string,
  cyl_mirror_right: string,
  frame_model: string,
  gender: number,
  interpupillary_distance: string,
  mobile: string,
  name: string,
  order_no: string,
  point_pupil_left: string,
  point_pupil_right: string,
  prism_left: string,
  prism_right: string,
  wx_user_id: string,
  address: string|null,
  remark: string|null,
  logistics_no: string|null,
  status: 'PENDING' | 'PASS' | 'REJECT' | 'SEND'
}