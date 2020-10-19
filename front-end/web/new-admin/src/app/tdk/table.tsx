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
import Button from '@material-ui/core/Button';
import {getJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';
import {TdkType, SearchStateType} from './index';
import EditDialog from './edit-dialog';

const useRowStyles = makeStyles({
  root: {
    
  },
});

function Row(props: { row: TdkType, onEdit: (id: number) => void}) {
  const { row, onEdit } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.keywords}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.path}</TableCell>
        <TableCell align="center"><Button color={"primary"} onClick={() => onEdit(row.id)}>编辑</Button></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props{
  search: SearchStateType
}

export default ({search}: Props) => {

  const [state, setState] = React.useState({data: [], count: 0});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [editDialogId, setEditDialogId] = React.useState(0);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = () => {
    const params = {
      title: search.searchText,
      keywords: search.searchText,
      description: search.searchText,
      pageNum: page,
      pageSize: rowsPerPage
    }
    getJson({path: BASE_URL+'/tdk/findByPage', data: params}).then(res => {
      if(res.success){
        setState({data: res.result, count: res.count});
      }
    })
  }

  React.useEffect(() => {
    getData();
  }, [JSON.stringify(search), page, rowsPerPage]);

  const handleEdit = (id: number) => {
    setEditDialogId(id);
  }

  const handleCloseEditDialog = () => {
    setEditDialogId(0);
  }

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell style={{width: '150px'}}>标题（title）</TableCell>
              <TableCell>关键词（keywords）</TableCell>
              <TableCell>描述（description）</TableCell>
              <TableCell>路由（path）</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row: TdkType) => (
              <Row key={row.id} row={row} onEdit={handleEdit}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <EditDialog key={editDialogId} id={editDialogId} open={editDialogId>0} onClose={handleCloseEditDialog} onRefresh={getData}/>
    </Paper>
  );
}
