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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import {getJson, postJson} from '@fay-react/lib/fetch';
import {BASE_URL, PATH_PREFIX} from '@/env';
import {OrderType, SearchStateType} from './index';
import AuditDialog from './audit-dialog';
import AddLogisticsNoDialog from './add-logistics-no-dialog';

const useRowStyles = makeStyles({
  root: {
    
  },
});

const statusText = {
  'PENDING': '未审核',
  'PASS': '已审核',
  'REJECT': '审核未通过',
  'SEND': '已发货',
}

function Row(props: { row: OrderType, onAudit: (row: OrderType) => void, onSend: (row: OrderType) => void}) {
  const { row } = props;
  const initOpenState = {optical: false, logistics: false, customer: false, remark: false};
  const [open, setOpen] = React.useState(initOpenState);
  const classes = useRowStyles();
  const addressObj: any = row.address && JSON.parse(row.address);

  const handleLookFace = React.useCallback((id: number) => {
    window.open(PATH_PREFIX+'/face?id='+id);
  }, []);

  const handleDownloadFace = React.useCallback((id: number, orderNo: string) => {
    postJson({path: BASE_URL+'/faceDownload', data: {id, filename: 'face-'+orderNo}}).then(res => {
      if(res.success){
        window.open(res.result);
      }
    })
  }, []);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.order_no}
        </TableCell>
        <TableCell>{row.creation_datetime}</TableCell>
        <TableCell>{statusText[row.status]}</TableCell>
        <TableCell>
          {row.name}
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen({...initOpenState, customer: !open.customer})}>
            {open.customer ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.frame_model}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen({...initOpenState, optical: !open.optical})}>
            {open.optical ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => handleLookFace(row.id)}>
            <FindInPageIcon />
          </IconButton>
          <IconButton size="small" onClick={() => handleDownloadFace(row.id, row.order_no)}>
            <CloudDownloadIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen({...initOpenState, logistics: !open.logistics})}>
            {
              addressObj ?
              open.logistics ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              :
              '---'
            }
          </IconButton>
        </TableCell>
        <TableCell>
          {row.remark && row.remark.substring(0, 8)}
          {
            row.remark && row.remark.length > 8 &&
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen({...initOpenState, remark: !open.remark})}>
              {open.remark ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
          
        </TableCell>
        <TableCell align="center">
          {
            row.status === 'PENDING' &&
            <Button color={"primary"} onClick={() => props.onAudit(row)}>审核</Button>
          }
          {
            row.status === 'PASS' &&
            <Button color={"primary"} onClick={() => props.onSend(row)}>发货</Button>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open.customer || open.optical || open.logistics || open.remark} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                open.customer &&
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    客户信息：
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    姓名：{row.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机号后四位：{row.mobile}&nbsp;&nbsp;&nbsp;性别：{row.gender===0?'男':row.gender===1?'女':'未知'}
                  </Typography>
                </div>
              }
              {
                open.optical &&
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    光度信息
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    右眼
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    柱镜：{row.cyl_mirror_right} 棱镜：{row.prism_right} 轴向：{row.axial_right} 点瞳：{row.point_pupil_right}
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    左眼
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    柱镜：{row.cyl_mirror_left} 棱镜：{row.prism_left} 轴向：{row.axial_left} 点瞳：{row.point_pupil_left}
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    双眼瞳距：{row.interpupillary_distance}
                  </Typography>
                </div>
              }
              {
                open.logistics &&
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    物流信息：
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    快递单号：{row.logistics_no && row.logistics_no.length>0 ? row.logistics_no : '暂无'}
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    地址：{addressObj.userName} {addressObj.telNumber} {addressObj.postalCode} {addressObj.provinceName} {addressObj.cityName} {addressObj.countyName} {addressObj.detailInfo}
                  </Typography>
                </div>
              }
              {
                open.remark &&
                <div>
                  <Typography variant="h6" gutterBottom component="div">
                    备注信息：
                  </Typography>
                  <Typography variant="body2" gutterBottom component="div">
                    {row.remark}
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
  type?: 'ALL' | 'PENDING' | 'PASS' | 'REJECT' | 'SEND'
  userId?: string
  search: SearchStateType
}

export default ({type='ALL', userId, search}: Props) => {

  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [auditOpen, setAuditOpen] = React.useState<OrderType|null>(null);
  const [logisticsOpen, setLogisticsOpen] = React.useState<OrderType|null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = (search: SearchStateType) => {
    getJson({path: BASE_URL+'/order/'+(userId || 'find'), data: search}).then(res => {
      console.log(res);
      if(res.success){
        setData(res.result);
      }
    })
  }

  React.useEffect(() => {
    getData(search);
  }, [JSON.stringify(search)]);

  const handleAudit = (row: OrderType) => {
    setAuditOpen(row);
  }
  
  const handleSend = (row: OrderType) => {
    setLogisticsOpen(row);
  }

  const handleClose = (id?: number, value?: string) => {
    if(value){
      postJson({path: BASE_URL+'/updOrderStatus', data: {id, status: value}}).then((res) => {
        if(res.success){
          getData(search);
        }
      })
    }
    auditOpen && setAuditOpen(null);
  }

  const handleSendClose = (id?: number, value?: string) => {
    if(value){
      postJson({path: BASE_URL+'/updOrderLogisticsNo', data: {id, logistics_no: value}}).then((res) => {
        if(res.success){
          getData(search);
        }
      })
    }
    logisticsOpen && setLogisticsOpen(null);
  }

  const _data = data.filter((item: OrderType)=> (type === 'ALL' || item.status === type));

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>订单编号</TableCell>
              <TableCell>下单时间</TableCell>
              <TableCell>订单状态</TableCell>
              <TableCell>客户</TableCell>
              <TableCell>镜框型号</TableCell>
              <TableCell>光度信息</TableCell>
              <TableCell align="center">人脸模型</TableCell>
              <TableCell align="center">物流信息</TableCell>
              <TableCell>备注</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: OrderType) => (
              <Row key={row.id} row={row} onAudit={handleAudit} onSend={handleSend}/>
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
      <AddLogisticsNoDialog data={logisticsOpen} open={logisticsOpen!==null} onClose={handleSendClose}/>
    </Paper>
  );
}
