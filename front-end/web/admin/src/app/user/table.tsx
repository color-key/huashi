import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {getJson, postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';
import {UserType, SearchStateType} from './index';
import AuditDialog from './audit-dialog';
import Order from '../order';

const useRowStyles = makeStyles({
  root: {
    
  },
 
});

const statusText = {
  'PENDING': '已注册',
  'PASS': '已开通',
  'REJECT': '未开通',
}

function Row(props: { row: UserType, onAudit: (row: UserType) => void}) {
  const { row } = props;
  const [open, setOpen] = React.useState({address: false, order: false});
  const classes = useRowStyles();
  const addressObj: any = row.address && JSON.parse(row.address);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center"><Avatar src={row.avatarUrl}/></TableCell>
        <TableCell>
          {row.nickName}
        </TableCell>
        <TableCell>
          {row.country} {row.province} {row.city}
        </TableCell>
        <TableCell>
          {addressObj && addressObj.userName}
        </TableCell>
        <TableCell>
          {addressObj && addressObj.telNumber}
        </TableCell>
        <TableCell>{row.creation_datetime}</TableCell>
        <TableCell align="center">{statusText[row.status]}</TableCell>
        <TableCell align="center">
          {
            row.status === 'PASS' ?
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen({address: false, order: !open.order})}>
              {open.order ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            :
            '---'
          }
          
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen({order: false, address: !open.address})}>
            {
              addressObj ?
              open.address ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              :
              '---'
            }
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {
            row.status === 'PENDING' &&
            <Button color={"primary"} onClick={() => props.onAudit(row)}>审核</Button>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open.order || open.address} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                open.order &&
                <Order userId={row.openid}/>
              }
              {
                open.address &&
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    物流信息：
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {addressObj.userName} {addressObj.telNumber} {addressObj.postalCode} {addressObj.provinceName} {addressObj.cityName} {addressObj.countyName} {addressObj.detailInfo}
                  </Typography>
                </div>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props{
  type?: 'ALL' | 'PENDING' | 'PASS' | 'REJECT' | 'SEND',
  search: SearchStateType
}

export default ({type='ALL', search}: Props) => {

  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [auditOpen, setAuditOpen] = React.useState<UserType|null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = (search: SearchStateType) => {
    getJson({path: BASE_URL+'/user/find', data: search}).then(res => {
      console.log(res);
      if(res.success){
        setData(res.result);
      }
    })
  }

  React.useEffect(() => {
    getData(search);
  }, [JSON.stringify(search)]);

  const handleAudit = (row: UserType) => {
    setAuditOpen(row);
  }

  const handleClose = (id?: number, value?: string) => {
    if(value){
      postJson({path: BASE_URL+'/user/updStatus', data: {id, status: value}}).then((res) => {
        if(res.success){
          getData(search);
        }
      })
    }
    setAuditOpen(null);
  }

  const _data = data.filter((item: UserType)=> (type === 'ALL' || item.status === type));

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>编号</TableCell>
              <TableCell>头像</TableCell>
              <TableCell>昵称</TableCell>
              <TableCell>地区</TableCell>
              <TableCell>联系人</TableCell>
              <TableCell>联系电话</TableCell>
              <TableCell>注册时间</TableCell>
              <TableCell align="center">用户状态</TableCell>
              <TableCell align="center">订单信息</TableCell>
              <TableCell align="right">物流信息</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: UserType) => (
              <Row key={row.id} row={row} onAudit={handleAudit}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={_data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AuditDialog data={auditOpen} open={auditOpen!==null} onClose={handleClose}/>
    </Paper>
  );
}
