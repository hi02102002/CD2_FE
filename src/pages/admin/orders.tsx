import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { IconX } from '@tabler/icons-react';

import { Breadcrumbs, MainContent } from '@/components/admin';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { AdminLayout } from '@/layouts/admin';
import orderService from '@/services/order.service';
import { Order, OrderStatus } from '@/types/order';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';

const SelectStatus = ({
    currentStatus,
}: {
    currentStatus: Order['status'];
}) => {
    return (
        <Select>
            {Object.values(OrderStatus).map((status) => (
                <MenuItem key={status}>{status}</MenuItem>
            ))}
        </Select>
    );
};

const ViewOrder = ({ order }: { order: Order }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box>
            <Button variant="contained" onClick={onOpen}>
                View{' '}
            </Button>
            {isOpen && (
                <Dialog open={isOpen} fullWidth>
                    <DialogTitle
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        Order #{order.orderId}
                        <IconButton onClick={onClose}>
                            <IconX />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box>
                            <Typography>
                                <Typography
                                    display="inline-block"
                                    fontWeight={700}
                                >
                                    User:{' '}
                                </Typography>{' '}
                                {order.fullName}
                            </Typography>
                            <Typography>
                                <Typography
                                    display="inline-block"
                                    fontWeight={700}
                                >
                                    Email:{' '}
                                </Typography>{' '}
                                {order.email || 'N/A'}
                            </Typography>
                            <Typography>
                                <Typography
                                    display="inline-block"
                                    fontWeight={700}
                                >
                                    Phone number:{' '}
                                </Typography>{' '}
                                {order.phoneNumber || 'N/A'}
                            </Typography>
                            <Typography>
                                <Typography
                                    display="inline-block"
                                    fontWeight={700}
                                >
                                    Address:{' '}
                                </Typography>{' '}
                                {order.address || 'N/A'}
                            </Typography>
                            <Typography>
                                <Typography
                                    display="inline-block"
                                    fontWeight={700}
                                >
                                    Status:{' '}
                                </Typography>{' '}
                                {order.status.toUpperCase() || 'N/A'}
                            </Typography>
                            <TableContainer component="div">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Product
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700,
                                                }}
                                                align="right"
                                            >
                                                Price
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: 700,
                                                }}
                                                align="right"
                                            >
                                                Quantity
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.orderItemsResponses.map(
                                            (row) => (
                                                <TableRow
                                                    key={row.cartItemId}
                                                    sx={{
                                                        '&:last-child td, &:last-child th':
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.productName}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {formatCurrency(
                                                            row.price,
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.quantity}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Stack direction="row" justifyContent="flex-end">
                                <Typography fontWeight={700}>
                                    Total: {formatCurrency(order.totalPrice)}
                                </Typography>
                            </Stack>
                            <SelectStatus currentStatus={order.status} />
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

const Orders: NextPageWithLayout = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    const handelFetchOrders = useCallback(
        async (q: { page?: number; limit?: number }) => {
            try {
                setIsLoading(true);
                const { data } = await orderService.getOrders(q);
                setOrders(data.content);
                setTotal(data.totalElements);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setOrders([]);
                setTotal(0);
            }
        },
        [],
    );

    const columns: GridColDef<Order>[] = useMemo(
        () => [
            {
                field: 'orderId',
                headerName: 'ID',
                width: 90,
                disableColumnMenu: true,
                sortable: false,
                renderCell(params) {
                    return <Box>#{params.value}</Box>;
                },
            },
            {
                field: 'fullName',
                headerName: 'User',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone',
                sortable: false,
                disableColumnMenu: true,
                width: 150,
            },
            {
                field: 'address',
                headerName: 'Address',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
            },
            {
                field: 'status',
                headerName: 'Status',
                sortable: false,
                disableColumnMenu: true,
                width: 100,
                renderCell(params) {
                    return <>{params.row.status.toUpperCase()}</>;
                },
            },
            {
                field: 'totalPrice',
                headerName: 'Price',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return <Box>{formatCurrency(params.value)}</Box>;
                },
            },
            {
                field: 'action',
                headerName: 'Action',
                sortable: false,
                disableColumnMenu: true,
                width: 100,
                renderCell(params) {
                    return <ViewOrder order={params.row} />;
                },
            },
        ],
        [],
    );

    useEffect(() => {
        handelFetchOrders({ page, limit });
    }, [handelFetchOrders, page, limit]);

    return (
        <>
            <Box p={16}>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            href: ROUTES.ADMIN,
                            name: 'Dashboard',
                        },
                        {
                            href: ROUTES.ADMIN_ORDERS,
                            name: 'Orders',
                        },
                    ]}
                />
                <Box mt={16}>
                    <MainContent
                        showTop={false}
                        TableProps={{
                            columns,
                            rows: orders,
                            loading: isLoading,
                            getRowId: (row) => row.orderId,
                        }}
                        TablePaginationProps={{
                            count: total,
                            onPageChange: (e, page) => {
                                setPage(page);
                            },
                            rowsPerPage: limit,
                            rowsPerPageOptions: [10, 20, 50],
                            onRowsPerPageChange: (e) => {
                                setLimit(Number(e.target.value));
                            },
                            page,
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

Orders.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;
