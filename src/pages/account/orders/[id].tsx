import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const OrderDetail: NextPageWithLayout = (props: Props) => {
    return <div>OrderDetail</div>;
};

OrderDetail.getLayout = (page) => {
    return (
        <ClientLayout description="Order Detail" title="Order Detail">
            <PageTop
                title="Order Detail"
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
                        href: ROUTES.ACCOUNT_ORDER,
                        name: 'Orders',
                    },
                    {
                        href: ROUTES.ADMIN_ORDERS,
                        name: 'Order Detail',
                    },
                ]}
            />
            {page}
        </ClientLayout>
    );
};

export default OrderDetail;
