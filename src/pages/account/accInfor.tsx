import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const AccInfor: NextPageWithLayout = (props: Props) => {
    return (
        <Box component="div" className="main-content">
            <Alert severity="warning">Change password</Alert>
        </Box>
    );
};

AccInfor.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="Account Information"
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
                        name: 'Account Information',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default AccInfor;
