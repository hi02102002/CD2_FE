import { Box } from '@mui/system';

import { Breadcrumbs, ProductAction } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const AddProduct: NextPageWithLayout<Props> = () => {
    return (
        <Box component="div" padding={16}>
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
                        name: 'Add Product',
                    },
                ]}
                MuiBreadcrumbsProps={{
                    maxItems: 3,
                }}
            />
            <Box>
                <ProductAction />
            </Box>
        </Box>
    );
};

AddProduct.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default AddProduct;
