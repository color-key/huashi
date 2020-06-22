import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Theme } from "@/components/theme";
import Divider from '@material-ui/core/Divider';
import { TablePaginationActions } from '../table-pagination-actions';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headContainer: {
    width: 1200,
    padding: theme.spacing(1.75, 0)
  },
  head: {
    display: 'flex'
  },
  headLink: {
    color: theme.colors.deepGrey,
    fontSize: '0.875rem'
  },
  headSpace: {
    color: theme.colors.deepGrey,
    fontSize: '0.875rem',
    margin: theme.spacing(0, 0.5, 0, 1),
  },
  headDes: {
    marginLeft: theme.spacing(0.5),
    color: '#212121',
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  fullWidth: {
    width: '100%'
  },
  title: {
    width: 1200,
    color: '#212121',
    fontSize: '2rem',
    margin: theme.spacing(8, 0, 4)
  },
  table: {
    width: 1200,
    marginBottom: theme.spacing(15)
  },
  rightIcon: {
    textAlign: 'center'
  },
  right: {
    width: 73,
    marginTop: theme.spacing(1)
  },
  rightPrimary: {
    fontSize: '0.75rem',
    color: theme.palette.grey[500]
  },
  footer: {
    border: 'none',
  },
  listItem: {
    padding: theme.spacing(2.5, 3)
  },
}));
const data = [{
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '刚刚'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '今天'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '昨天'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '昨天'
}, {
  title: '全方位解读IPFS生态圈：未来，因IPFS…',
  desc: '区块链硬盘挖矿生态中，IPFS显然是个特例它率先提出了“以硬盘有效信息存储，替代哈希存储”的…',
  time: '昨天'
}];
export default () => {
  const router = useRouter();
  const classes = useStyles({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any[]>([]);
  React.useEffect(() => {
    setRows(data);
    // getJson({ path: BASE_SERVICE_URL + '/order/list' })
    //   .then((resp: any) => {
    //     if (resp.status === 0) {
    //       setRows(resp.records)
    //     }
    //   })
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
  const basePath = router.pathname.replace('/news', '');
  return (
    <div className={classes.root}>
      <div className={classes.headContainer}>
        <Box className={classes.head}>
          <Link href={basePath} variant="inherit" className={classes.headLink}>帮助中心</Link>
          <Typography className={classes.headSpace}>/</Typography>
          <Typography className={classes.headDes}>资讯动态</Typography>
        </Box>
      </div>
      <Divider className={classes.fullWidth}/>
      <Typography className={classes.title}>资讯动态</Typography>
      <Table className={classes.table} >
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.orderId} >
              <ListItem button disableGutters className={classes.listItem} onClick={() => router.push({pathname: basePath + '/detail', query: {path: 'news'}})}>
                <ListItemText primary={row.title} secondary={row.desc} />
                <div className={classes.rightIcon}>
                  <ListItemText primary={""} secondary={row.time} secondaryTypographyProps={{ align: "center", className: classes.rightPrimary }} className={classes.right} />
                  <KeyboardArrowRight />
                </div>
              </ListItem>
              <Divider />
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
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
              className={classes.footer}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}