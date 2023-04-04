import { PageTop } from '@/components/common';
import { OrderTable } from '@/components/pages/account';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const Orders: NextPageWithLayout = () => {
    return (
        // <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
        //     <Alert severity="warning">You have placed no orders.</Alert>
        // </Box>
        <OrderTable />
    );
};

Orders.getLayout = (page) => {
    return (
        <ClientLayout
            title="My Orders"
            description="My Orders"
        >
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
