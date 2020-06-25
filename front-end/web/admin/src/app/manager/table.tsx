import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';
import {ManagerType, SearchStateType} from './index';

const useRowStyles = makeStyles({
  root: {
    
  },
});

function Row(props: { row: ManagerType}) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell>{row.creation_datetime}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props{
  search: SearchStateType
}

export default ({search}: Props) => {

  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = (search: SearchStateType) => {
    getJson({path: BASE_URL+'/manager/find', data: search}).then(res => {
      console.log(res);
      if(res.success){
        setData(res.result);
      }
    })
  }

  React.useEffect(() => {
    getData(search);
  }, [JSON.stringify(search)]);

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>用户名</TableCell>
              <TableCell>创建时间</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: ManagerType) => (
              <Row key={row.id} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
