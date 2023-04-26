import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getCookies } from 'cookies-next';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import axiosServer from '@/lib/axiosServer';
import { Order, OrderStatus } from '@/types/order';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';
import { withProtect } from '@/utils/withProtect';

const colors: Record<keyof typeof OrderStatus, string> = {
    cancel: '#ef4444',
    delivering: '#8b5cf6',
    pending: '#0ea5e9',
    success: '#22c55e',
    received: '#22c55e',
};

type Props = {
    order: Order;
};

const OrderDetail: NextPageWithLayout<Props> = ({ order }) => {
    return (
        <Box component="div" className="container-app">
            <Box maxWidth={640} marginX="auto">
                <Stack gap={16}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div>
                            <Typography fontWeight={600}>
                                #{order?.orderId}
                            </Typography>
                            <Typography>
                                {new Date(
                                    order.createdDate || Date.now(),
                                ).toLocaleDateString('en', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                })}
                            </Typography>
                        </div>
                        <Typography
                            sx={{
                                color: colors[order.status],
                            }}
                            fontWeight={500}
                        >
                            {order.status.toUpperCase()}
                        </Typography>
                    </Stack>
                    <div>
                        <Typography>Deliver to</Typography>
                        <Typography fontWeight={600}>
                            {order.address}
                        </Typography>
                    </div>
                    <TableContainer component="div">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 16,
                                            color: (theme) =>
                                                theme.themeColor.primary,
                                        }}
                                    >
                                        Product
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 16,

                                            color: (theme) =>
                                                theme.themeColor.primary,
                                        }}
                                        align="right"
                                    >
                                        Price
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 16,

                                            color: (theme) =>
                                                theme.themeColor.primary,
                                        }}
                                        align="right"
                                    >
                                        Quantity
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.orderItemsResponses.map((row) => (
                                    <TableRow
                                        key={row.cartItemId}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.productName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {formatCurrency(row.price)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.quantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack alignItems="flex-end">
                        <Typography fontWeight={600}>
                            Sub total: {formatCurrency(order.totalPrice - 5)}
                        </Typography>
                        <Typography fontWeight={600}>
                            Shipping: {formatCurrency(5)}
                        </Typography>
                        <Typography fontWeight={600}>
                            Total: {formatCurrency(order.totalPrice)}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
};

OrderDetail.getLayout = (page) => {
    return (
        <ClientLayout description="Order Detail" title="Order Detail">
            <PageTop
                title="Order Detail"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.ACCOUNT,
                        name: 'Account',
                    },
                    {
                        href: ROUTES.ACCOUNT_ORDER,
                        name: 'Orders',
                    },
                    {
                        href: ROUTES.ADMIN_ORDERS,
                        name: 'Order Detail',
                    },
                ]}
            />
            {page}
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})(async (ctx) => {
    let order: Order | null = null;
    const orderId = ctx.params?.id as string;
    const { auth_token } = getCookies({
        req: ctx.req,
        res: ctx.res,
    });
    try {
        order = await axiosServer(auth_token as string)
            .get('/api/order/get-one', {
                params: {
                    orderId,
                },
            })
            .then((v) => v.data.data);
        if (!order) {
            return {
                notFound: true,
            };
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/500',
                permanent: false,
            },
        };
    }

    console.log(order);

    return {
        props: {
            order,
        },
    };
});

export default OrderDetail;
