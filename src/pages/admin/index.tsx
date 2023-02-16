import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';

const Admin: NextPageWithLayout = () => {
    return <div></div>;
};

Admin.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
