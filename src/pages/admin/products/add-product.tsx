import { Box } from '@mui/system';

import { Breadcrumbs } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const AddProduct: NextPageWithLayout<Props> = () => {
    return (
        <Box
            component="div"
            sx={{
                padding: pxToRem(16),
            }}
        >
            <Breadcrumbs
                breadcrumbs={[
                    {
                        href: ROUTES.ADMIN,
                        name: 'Dashboard',
                    },
                    {
                        href: ROUTES.ADMIN_PRODUCT,
                        name: 'Products',
                    },
                    {
                        href: ROUTES.ADMIN_ADD_PRODUCT,
                        name: 'Add product',
                    },
                ]}
                MuiBreadcrumbsProps={{
                    maxItems: 3,
                }}
            />
        </Box>
    );
};

AddProduct.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AddProduct;
