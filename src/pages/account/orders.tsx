import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const Orders: NextPageWithLayout = (props: Props) => {
    return (
        <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
            <Alert severity="warning">You have placed no orders.</Alert>
        </Box>
    );
};

Orders.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Orders"
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
                        href: ROUTES.LOGIN,
                        name: 'Orders',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default Orders;
