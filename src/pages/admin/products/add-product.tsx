import { Box } from '@mui/system';

import { Breadcrumbs, ProductAction } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import axiosClient from '@/lib/axiosClient';
import type { Category } from '@/types/category';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

type Props = {
    categories: Category[];
};

const AddProduct: NextPageWithLayout<Props> = ({ categories }) => {
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
                <ProductAction categories={categories} />
            </Box>
        </Box>
    );
};

AddProduct.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})(async () => {
    const categories = await axiosClient
        .get('/api/category/all')
        .then((d) => d.data)
        .catch((e) => console.log(e));

    return {
        props: {
            categories,
        },
    };
});

export default AddProduct;

