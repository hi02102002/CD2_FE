import { PageTop } from '@/components/common';
import { ReviewTable } from '@/components/pages/account';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const productReview: NextPageWithLayout = () => {
    return (
        // <Box className="container-app" sx={{ padding: 0, marginBottom: 24 }}>
        //     <Alert severity="warning">You have submitted no reviews.</Alert>
        // </Box>
        <ReviewTable />
    );
};

productReview.getLayout = (page) => {
    return (
        <ClientLayout title="My Product Review" description="My Product Review">
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
