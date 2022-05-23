import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [IBMDate, setIMBDate] = useState([]);
  const [IBMData, setIBMData] = useState([]);
  const [column, setColumn] = useState([]);
  const [rate,setRate] = useState([]);


//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
useEffect(() => {
    loadDataIBM();
}, []);

const loadDataIBM = async() => {
    await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo")
        .then(res => res.json())
        .then(data => {
           
            let core = data['Weekly Time Series'];
            
            let keysFetch = Object.entries(data);
            let dateArr = Object.entries(keysFetch[1][1]).map(entry => entry[0]);
           
            setIMBDate(dateArr);
            let details = Object.values(core);
            setIBMData(details.map(day => Object.values(day)));
            // console.log(details.slice(0, 6).map(day => Object.values(day)));
            let columnArr = Object.entries(details[0]).map(a => a[0]);
            

            setColumn(columnArr);
     

        })
        .catch((error) => {
            console.log('Error :>> ', error);
        });
}

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
                <TableCell style={{ backgroundColor: 'burlywood',  textTransform: 'uppercase' }}>Date
                </TableCell>
              {column.map((p) => (
                <TableCell key={p} style={{ backgroundColor: 'burlywood', textTransform: 'uppercase' }}>
                  {p}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {IBMDate
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    
                        <TableCell>
                            {row.split('-').reverse().join('/')}
                        </TableCell>
                        
                            {IBMData[rowIndex].map( (x,dataIndex) => (<TableCell key={dataIndex}>{x}</TableCell>))}
                        
                    
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
