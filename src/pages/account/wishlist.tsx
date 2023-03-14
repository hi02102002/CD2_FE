import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const Wishlist: NextPageWithLayout = () => {
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
