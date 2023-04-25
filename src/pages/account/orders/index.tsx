import { PageTop } from '@/components/common';
import { OrderTable } from '@/components/pages/account';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const Orders: NextPageWithLayout = () => {
    return <OrderTable />;
};

Orders.getLayout = (page) => {
    return (
        <ClientLayout title="My Orders" description="My Orders">
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

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default Orders;
