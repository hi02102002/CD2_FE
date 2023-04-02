import { Box } from '@mui/material';

import { Breadcrumbs } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';

const Customer: NextPageWithLayout = () => {
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
                {/* <MainContent
                    TableProps={{
                        columns: [],
                        rows: [],
                    }}
                    ButtonAddProps={{
                        textButton: 'Add Customer',
                        sx: {
                            display: 'none',
                        },
                    }}
                /> */}
            </Box>
        </Box>
    );
};

Customer.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Customer;
