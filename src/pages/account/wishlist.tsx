import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const Wishlist: NextPageWithLayout = (props: Props) => {
    return <div>Wishlist</div>;
};

Wishlist.getLayout = (page) => {
    return (
        <ClientLayout>
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default Wishlist;
