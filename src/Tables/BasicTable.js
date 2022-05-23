import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from '@mui/material/styles';

import { useState, useEffect } from 'react';


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

export default function BasicTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
        // getData();
    }, []);

    const loadData = async() => {
        await fetch("https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=demo")
            .then(res => res.json())
            .then(data => {
                setData(data.data);
            })
            .catch((error) => {
                console.log('Error :>> ', error);
            });
    }

 return (
   <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
            {/* <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Value</StyledTableCell> */}
           <TableCell align="left">Date</TableCell>
           <TableCell align="left">Value</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row.date}>
            {/* <StyledTableCell>{row.date.split('-').reverse().join('/')}</StyledTableCell>
            <StyledTableCell>{row.value}</StyledTableCell> */}
             <TableCell align="left">{row.date.split('-').reverse().join('/')}</TableCell>
             <TableCell align="left">{row.value} billions dollars</TableCell>
             
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}