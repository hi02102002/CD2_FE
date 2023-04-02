import { GetServerSideProps } from 'next';

import { Box, Stack, Typography } from '@mui/material';

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
import { Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';

type Props = {
    categories: Category[];
    products: Product[];
    total: number;
};

const Products: NextPageWithLayout<Props> = ({
    categories,
    products,
    total,
}) => {
    const { options, handelFilter } = useFilter();
    return (
        <Box paddingY={35}>
            <Box component="div" className="container-app">
                <ToolBar categories={categories} />
                {products?.length > 0 ? (
                    <>
                        <Box marginTop={16}>
                            <ProductGrid spacing={16} products={products} />
                        </Box>
                        <Stack
                            marginTop={30}
                            direction="row"
                            justifyContent="center"
                        >
                            <Pagination
                                count={total}
                                page={options.offset || 1}
                                onChange={(e, page) => {
                                    handelFilter({ offset: page });
                                }}
                            />
                        </Stack>
                    </>
                ) : (
                    <Box paddingY={60}>
                        <Typography variant="h5" align="center">
                            No products found
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

Products.getLayout = (page) => {
    return (
        <ClientLayout>
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
            <FilterProvider>{page}</FilterProvider>
        </ClientLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = ctx.query;
    const categories = await axiosClient
        .get('/api/category/all')
        .then((d) => d.data)
        .catch((e) => console.log(e));

    const { products, total } = await axiosClient
        .get('/api/product/filter', {
            params: {
                ...query,
                limit: 12,
                offset: query.offset ? Number(query.offset) - 1 : undefined,
            },
        })
        .then((d) => {
            return {
                products: d.data?.content as Product[],
                total: d.data.totalPages,
            };
        });

    return {
        props: {
            categories,
            products,
            total,
        },
    };
};

export default Products;
