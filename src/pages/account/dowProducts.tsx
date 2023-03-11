import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const DowProducts: NextPageWithLayout = (props: Props) => {
    return (
        <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
            <Alert severity="warning">
                You have not purchased any downloadable products yet.
            </Alert>
        </Box>
    );
};

DowProducts.getLayout = (page) => {
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
                        name: 'My Dowloadable Products',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default DowProducts;
