import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const DownProducts: NextPageWithLayout = () => {
    return (
        <Box component="div" className="main-content">
            <Alert severity="warning">
                You have not purchased any downloadable products yet.
            </Alert>
        </Box>
    );
};

DownProducts.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Dowloadable Products"
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
                        name: 'My Downloadable Products',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default DownProducts;
