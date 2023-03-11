import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const Wishlist: NextPageWithLayout = (props: Props) => {
    return (
        <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
            <Alert severity="warning">
                You have no items in your wish list.
            </Alert>
        </Box>
    );
};

Wishlist.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Wish List"
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
                        name: 'Wishlist',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default Wishlist;