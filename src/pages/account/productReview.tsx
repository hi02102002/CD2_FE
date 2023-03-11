import { Alert, Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const productReview: NextPageWithLayout = (props: Props) => {
    return (
        <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
            <Alert severity="warning">You have submitted no reviews.</Alert>
        </Box>
    );
};

productReview.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Product Review"
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
                        name: 'My Product Review',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default productReview;
