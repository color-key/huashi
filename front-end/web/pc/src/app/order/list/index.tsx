import React from 'react';
import moment from 'moment';
import Router from 'next/router';
import { makeStyles, withStyles, useTheme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Box from '@material-ui/core/Box';
import { Theme } from "@/components/theme";
import { Order } from '../index.d';
import { getJson } from '@fay-react/lib/fetch';
import { BASE_SERVICE_URL, PATH_PREFIX } from '@/env';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PayStatus from './pay-status';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    }
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      // backgroundColor: theme.palette.common.black,
      // color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles2 = makeStyles({
  root: {
    padding: '0 0 120px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  head: {
    width: '100%',
    height: 120,
    background: `url('${PATH_PREFIX}/static/banner/1.png') no-repeat fixed center`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  btnContent: {
    width: 1200,
    height: 64,
    color: '#FFFFFF'
  },
  tab: {
    width: 300,
    height: '100%'
  },
  item: {
    width: 100,
    minWidth: 100,
    fontSize: '1.25rem',
    fontWeight: 500,
    marginTop: '10px'
  },
  table: {
    width: 1200,
    marginTop: '64px'
  },
});

const StyledTabs = withStyles(() => 
  createStyles({
    root: {
      width: 300,
      height: '100%',
    },
    indicator: {
      backgroundColor: '#263BE0',
      height: 4
    },
  }),
)(Tabs);

export default () => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sources, setSources] = React.useState<Order[]>([]);
  const [rows, setRows] = React.useState<Order[]>([]);
  const [tabIdx, setTabIdx] = React.useState(0);

  React.useEffect(() => {
    getJson({ path: BASE_SERVICE_URL + '/order/list' })
      .then((resp: any) => {
        if (resp.status === 0) {
          setRows(resp.records);
          setSources(resp.records);
        }
      })
  }, []);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const tableClick = (orderId: string) => {
    Router.push({
      pathname: PATH_PREFIX + '/order/detail',
      query: { id: orderId }
    })
  }
  const handleTabChange = (_e: any, val: any) => {
    setTabIdx(val);
    const select = sources.filter((order: Order) => {
      if (val === 0) {
        return true
      } else if (val === 1) {
        return order.status === 'UnPaid'
      } else {
        return order.status === 'Paid'
      }
    });
    setRows(select);
  }
  return (
    <div className={classes.root}>
      <div className={classes.head}>
        <div className={classes.btnContent}>
          <StyledTabs
            value={tabIdx}
            onChange={handleTabChange}
            variant="fullWidth"
            className={classes.tab}
          >
            <Tab label='全部' className={classes.item}/>
            <Tab label='待付款' className={classes.item}/>
            <Tab label='已完成' className={classes.item}/>
          </StyledTabs>
        </div>
      </div>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>下单时间</StyledTableCell>
            <StyledTableCell>订单号</StyledTableCell>
            <StyledTableCell>合约名称</StyledTableCell>
            <StyledTableCell>数量（TB）</StyledTableCell>
            <StyledTableCell align="right">订单状态</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <StyledTableRow key={row.orderId} onClick={() => tableClick(row.orderId)}>
              <TableCell component="th" scope="row">
                {moment(row.createdOn).format('YYYY-MM-DD HH:mm:ss')}
              </TableCell>
              <TableCell style={{ width: 260 }}>
                {row.orderId}
              </TableCell>
              <TableCell style={{ width: 360 }}>
                {row.productName}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.orderUnits}
              </TableCell>
              <TableCell style={{ width: 220 }} align="right">
                <PayStatus data={row}/>
              </TableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} >
                {rows.length ? null : <Box textAlign='center'><Typography>暂无数据</Typography></Box>}
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <TablePagination
              labelRowsPerPage={'每页行数：'}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': '每页行数：' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
