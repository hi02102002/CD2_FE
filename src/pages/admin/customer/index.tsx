import { useCallback, useEffect, useMemo, useState } from 'react';

import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Breadcrumbs, MainContent } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import authService from '@/services/auth.service';
import { NextPageWithLayout } from '@/types/shared';
import { User } from '@/types/user';

const Customer: NextPageWithLayout = () => {
    const [customers, setCustomers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await authService
                .getAllUser({ page, limit })
                .then((v) => v.data);
            setCustomers(res.content);
            setTotal(res.totalElements);

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [page, limit]);

    const columns: GridColDef<User>[] = useMemo(
        () => [
            {
                field: 'userId',
                headerName: 'ID',
                width: 90,
                disableColumnMenu: true,
                sortable: false,
            },
            {
                field: 'fullName',
                headerName: 'Name',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
            },
            {
                field: 'email',
                headerName: 'Email',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
            },
            {
                field: 'phoneNumber',
                headerName: 'Phone',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return <Box>{params.value || 'N/A'}</Box>;
                },
            },
            {
                field: 'dateOfBirth',
                headerName: 'Date of birth',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return <Box>{params.value || 'N/A'}</Box>;
                },
            },
            {
                field: 'sex',
                headerName: 'Gender',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return <Box>{params.value || 'N/A'}</Box>;
                },
            },
        ],
        [],
    );

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return (
        <Box component="div" padding={16}>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        href: ROUTES.ADMIN,
                        name: 'Dashboard',
                    },
                    {
                        href: ROUTES.ADMIN_CUSTOMER,
                        name: 'Customer',
                    },
                ]}
            />
            <Box marginTop={16}>
                <MainContent
                    TableProps={{
                        columns: columns,
                        rows: customers,
                        getRowId: (row) => row.userId,
                        loading,
                    }}
                    showTop={false}
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
    );
};

Customer.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Customer;
