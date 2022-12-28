import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { GetOrdersAsync } from '../Slicers/GetAllOrdersSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { selectToken } from '../Slicers/loginSlice';

// This component retunes to the user all of his Orders sorted in table.

// Columns for the table fiters of orders
const columns = [
    { id: '_id', label: 'OrderID', minWidth: 100 },
    { id: 'FirstName', label: "First Name", minWidth: 150 },
    { id: 'LastName', label: "Last Name", minWidth: 150 },
    { id: 'email', label: "Email", minWidth: 100 },
    { id: 'city', label: 'City', minWidth: 100 },
    { id: 'district', label: 'District', minWidth: 100 },
    { id: 'phone_num', label: 'Phone Number', minWidth: 100 },
    { id: 'postal_code', label: 'Postal Code', minWidth: 100 },
    { id: 'Total', label: 'Total', minWidth: 100 },
    { id: 'createdTime', label: 'Orderd at', minWidth: 100},
];


export default function ColumnGroupingTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [AllOrders, setAllOrders] = useState([])
    const [OrdersTotal, setOrdersTotal] = useState(0)
    const token = useSelector(selectToken)
    const dispatch = useDispatch()
    const rows = AllOrders

    const SumOfOrders = (orders) => {
        var total = 0
        for (let index = 0; index < orders.length; index++) {
            console.log(orders[index].Total)
            total = total + orders[index].Total
        }
        setOrdersTotal(total)
    }
    useEffect(() => {
        SumOfOrders(AllOrders)
    }, [AllOrders])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <button class="animate__animated animate__backInDown" style={{ width: "60%", fontSize: "20px", color: "white", backgroundColor: "dodgerblue" }} onClick={() => dispatch(GetOrdersAsync({ "Token": token })).then(x => setAllOrders(x.payload))}>Show my orders:</button>
                            </TableCell>
                            <TableCell style={{ width:"50%",height: "50px", fontSize: "35px" }} align="left" colSpan={10}>
                                My Orders:
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth, fontSize: "20px" }}

                                >
                                    {column.label}:
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ fontsize: "20px" }}>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow style={{ fontsize: "20px" }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell style={{ fontsize: "20px" }} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : <p>{value}</p>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ fontsize: "20px" }}
                rowsPerPageOptions={[10, 15, 30]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {AllOrders.length > 0 ? <p style={{ textAlign: "left", fontsize: "20px" }}>The total cost of all your orders: {OrdersTotal}₪</p> : null}

        </Paper>
    );
}