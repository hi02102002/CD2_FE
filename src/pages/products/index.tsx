import { Stack } from '@mui/material';
import { Box } from '@mui/system';

import { ProductGrid } from '@/components/client';
import { PageTop, Pagination } from '@/components/common';
import {
    FilterProvider,
    ToolBar,
    useFilter,
} from '@/components/pages/products';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import axiosClient from '@/lib/axiosClient';
import { Category } from '@/types/category';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

type Props = {
    categories: Category[];
};

const Products: NextPageWithLayout<Props> = ({ categories }) => {
    const { options, handelFilter } = useFilter();
    return (
        <>
            <PageTop
                title="Shop"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.PRODUCTS,
                        name: 'Shop',
                    },
                ]}
            />
            <Box marginY={35}>
                <Box component="div" className="container-app">
                    <ToolBar categories={categories} />

                    <Box marginTop={16}>
                        <ProductGrid spacing={16} />
                    </Box>
                    <Stack
                        marginTop={30}
                        direction="row"
                        justifyContent="center"
                    >
                        <Pagination
                            count={5}
                            page={options.page || 1}
                            onChange={(e, page) => {
                                handelFilter({ page });
                            }}
                        />
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

Products.getLayout = (page) => {
    return (
        <ClientLayout>
            <FilterProvider>{page}</FilterProvider>
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: false,
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

export default Products;
