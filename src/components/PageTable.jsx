import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper
} from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ order, orderBy, onRequestSort, headCells }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        {headCell.disableSorting ? (
                            headCell.label
                        ) : (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                sx={{
                                    color: 'white',
                                    transition: 'none',
                                    '&.Mui-active': {
                                        color: 'white',
                                    },
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: 'transparent',
                                    },
                                    '& .MuiTableSortLabel-icon': {
                                        color: 'white !important',
                                    },
                                }}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        )}
                    </TableCell>
                ))}
                <TableCell
                    align="center"
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    X
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            disablePadding: PropTypes.bool,
        })
    ).isRequired,
};

const PageTable = ({ headCells, rows, actions }) => {
    const { t } = useTranslation();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headCells[0]?.id || '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }} elevation={3}>
                <TableContainer sx={{ maxHeight: 500, overflowX: 'auto' }}>
                    <Table stickyHeader sx={{ minWidth: 750 }} size="medium">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {visibleRows.length > 0 ? (
                                visibleRows.map((row, index) => (
                                    <TableRow key={row.id || index}>
                                        {headCells.map((cell, i) => (
                                            <TableCell
                                                key={cell.id}
                                                align={cell.numeric ? 'right' : 'left'}
                                                component={i === 0 ? 'th' : 'td'}
                                                scope={i === 0 ? 'row' : undefined}
                                                padding={cell.disablePadding ? 'none' : 'normal'}
                                            >
                                                {row[cell.id]}
                                            </TableCell>
                                        ))}
                                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                                            {actions ? actions(row) : null}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={headCells.length + 1} align="center">
                                        {t('pagination.noRecordsFound')}
                                    </TableCell>
                                </TableRow>
                            )}

                            {emptyRows > 0 && visibleRows.length > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={headCells.length} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={t('pagination.rowsPerPage')}
                    labelDisplayedRows={({ from, to, count }) =>
                        t('pagination.paginationRange', { from, to, count })
                    }
                />
            </Paper>
        </Box>
    );
};

PageTable.propTypes = {
    headCells: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            disablePadding: PropTypes.bool,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PageTable;