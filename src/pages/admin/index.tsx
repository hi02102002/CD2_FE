import { useEffect, useMemo, useState } from 'react';

import {
    Grid,
    MenuItem,
    Paper,
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
import { Box } from '@mui/system';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { getCookies } from 'cookies-next';
import { Line } from 'react-chartjs-2';

import { Breadcrumbs } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import axiosClient from '@/lib/axiosClient';
import axiosServer from '@/lib/axiosServer';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';
import { withProtect } from '@/utils/withProtect';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Revenue chart',
        },
    },
};

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const generateYearsBetween = (startYear = 2000, endYear?: number) => {
    const endDate = endYear || new Date().getFullYear();
    const years: number[] = [];

    for (let i = startYear; i <= endDate; i++) {
        years.push(startYear);
        startYear++;
    }
    return years;
};

type Props = {
    dashboard: {
        totalOrder: number;
        totalProduct: number;
        totalPrice: number;
        orderReceived: number;
        orderPending: number;
        orderDelivering: number;
        orderSuccess: number;
        top5Products: Array<{
            productId: number;
            imageUrl: string;
            totalSales: number;
            productName: string;
        }>;
        top5Users: Array<{
            userId: number;
            fullname: string;
            email: string;
            totalOrder: number;
            totalPrice: number;
        }>;
    };
};

const Admin: NextPageWithLayout<Props> = ({ dashboard }) => {
    const [chart, setChart] = useState<
        Array<{
            month: number;
            totalPrice: number;
            totalProduct: number;
        }>
    >();
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosClient
                    .get(`/api/dashboard/sales-month`, {
                        params: {
                            year,
                        },
                    })
                    .then((res) => res.data);
                setChart(res);
            } catch (error) {}
        })();
    }, [year]);

    const data = useMemo(
        () => ({
            labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: labels.map((l, i) => {
                        return chart?.find((c) => c.month === i + 1)
                            ?.totalPrice;
                    }),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Number of products sold',
                    data: labels.map(
                        (l, i) =>
                            chart?.find((c) => c.month === i + 1)?.totalProduct,
                    ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }),
        [chart],
    );

    return (
        <Box
            sx={{
                padding: 16,
            }}
        >
            <Breadcrumbs
                breadcrumbs={[
                    {
                        href: ROUTES.ADMIN,
                        name: 'Dashboard',
                    },
                ]}
            />
            <Stack mt={16} gap={16}>
                <Grid container spacing={16}>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#eab308',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Total Revenue ($)
                            </Typography>
                            {formatCurrency(
                                Number(dashboard.totalPrice.toFixed(2)),
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#84cc16',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Total Order (Success)
                            </Typography>
                            {dashboard.totalOrder}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#3b82f6',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Total Product Sales
                            </Typography>
                            {dashboard.totalProduct}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#7c3aed',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Order Success
                            </Typography>
                            {dashboard.orderReceived}
                        </Box>
                    </Grid>{' '}
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#ea580c   ',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Order Pending
                            </Typography>
                            {dashboard.orderPending}
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box
                            sx={{
                                borderRadius: '4px',
                                aspectRatio: '1/1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                textAlign: 'center',
                                gap: 8,
                                fontSize: 20,
                                fontWeight: 600,
                                color: '#fff',
                                padding: 8,
                                backgroundColor: '#db2777',
                            }}
                        >
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                color="inherit"
                            >
                                Order Delivering
                            </Typography>
                            {dashboard.orderDelivering}
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    maxWidth={1024}
                    mx="auto"
                    width="100%"
                    component={Paper}
                    p={16}
                >
                    <Select
                        placeholder="Select year"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        size="small"
                    >
                        {generateYearsBetween(2021, 2025).map((year) => {
                            return (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <Line options={options} data={data} />
                </Box>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <Typography mb={16} fontSize={18} fontWeight={600}>
                            Top 5 Users{' '}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Full name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Total Order</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dashboard.top5Users.length > 0 ? (
                                        dashboard.top5Users.map((user) => {
                                            return (
                                                <TableRow key={user.userId}>
                                                    <TableCell align="left">
                                                        {user.userId}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {user.fullname}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {user.totalOrder}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {formatCurrency(
                                                            Number(
                                                                user.totalPrice.toFixed(
                                                                    2,
                                                                ),
                                                            ),
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={5}
                                            >
                                                No data
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography mb={16} fontSize={18} fontWeight={600}>
                            Top 5 Products{' '}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Product name</TableCell>
                                        <TableCell>Total Sales</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dashboard.top5Products.length > 0 ? (
                                        dashboard.top5Products.map(
                                            (product) => {
                                                return (
                                                    <TableRow
                                                        key={product.productId}
                                                    >
                                                        <TableCell align="left">
                                                            {product.productId}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {
                                                                product.productName
                                                            }
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {product.totalSales}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            },
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={3}
                                            >
                                                No data
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
};

Admin.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})(async (ctx) => {
    const { auth_token } = getCookies({
        req: ctx.req,
        res: ctx.res,
    });

    const res = await axiosServer(auth_token as string).get(
        '/api/dashboard/total-order',
    );

    return {
        props: {
            dashboard: res.data.data,
        },
    };
});

export default Admin;
