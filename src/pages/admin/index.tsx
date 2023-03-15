import { Box } from '@mui/system';

import { Breadcrumbs } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const Admin: NextPageWithLayout = () => {
    return (
        <Box
            sx={{
                padding: 16,
            }}
        >
            <Breadcrumbs
                breadcrumbs={[
                    {
                        href: ROUTES.ADMIN,
                        name: 'Dashboard',
                    },
                ]}
            />
        </Box>
    );
};

Admin.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})();

export default Admin;
