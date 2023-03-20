import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const storePayMet: NextPageWithLayout = (props: Props) => {
    return (
        <Box component='div' className='main-content'>
            <Alert severity="warning">
                You have no stored payment methods.
            </Alert>
        </Box>
    );
};

storePayMet.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="Store Payment Methods"
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
                        name: 'Stored Payment Methods',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default storePayMet;
