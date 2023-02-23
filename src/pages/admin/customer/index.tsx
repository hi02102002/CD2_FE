import { Box } from '@mui/material';

import { Breadcrumbs, MainContent } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

const Customer: NextPageWithLayout = () => {
    return (
        <Box
            component="div"
            sx={{
                padding: pxToRem(16),
            }}
        >
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
            <Box
                sx={{
                    marginTop: pxToRem(16),
                }}
            >
                <MainContent
                    TableProps={{
                        columns: [],
                        rows: [],
                    }}
                    ButtonAddProps={{
                        textButton: 'Add Customer',
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
