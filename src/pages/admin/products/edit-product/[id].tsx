import { Box } from '@mui/material';

import { Breadcrumbs, ProductAction } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import axiosClient from '@/lib/axiosClient';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

type Props = {
    product: Product;
    categories: Category[];
};

const EditProduct: NextPageWithLayout<Props> = ({ product, categories }) => {
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
                        href: ROUTES.ADMIN_EDIT_PRODUCT,
                        name: 'Edit Product',
                    },
                ]}
                MuiBreadcrumbsProps={{
                    maxItems: 3,
                }}
            />
            <Box>
                <ProductAction
                    categories={categories}
                    defautlValues={product}
                    type="EDIT"
                />
            </Box>
        </Box>
    );
};

EditProduct.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})(async (ctx) => {
    const id = ctx.query.id as string;
    const categories = await axiosClient
        .get('/api/category/all')
        .then((d) => d.data)
        .catch((e) => console.log(e));
    const product = await axiosClient
        .get('/api/product/getOne', {
            params: {
                id,
            },
        })
        .then((d) => d.data);

    return {
        props: {
            categories,
            product,
        },
    };
});

export default EditProduct;
