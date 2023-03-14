import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

// type Props = {};

const Account: NextPageWithLayout = () => {
    return <div>Account</div>;
};

Account.getLayout = (page) => {
    return (
        <ClientLayout>
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default Account;
