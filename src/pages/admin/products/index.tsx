import { useRouter } from 'next/router';

import { Box, Grid } from '@mui/material';

import { Breadcrumbs, MainContent, ProductFilter } from '@/components/admin';
import { ROUTES } from '@/constants';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Products: NextPageWithLayout = (props: Props) => {
    const router = useRouter();

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
                ]}
            />
            <Box
                sx={{
                    marginTop: 16,
                }}
            >
                <Grid
                    container
                    columnSpacing={{ xs: 0, md: 16 }}
                    rowSpacing={{ xs: 16, md: 0 }}
                >
                    <Grid item xs={12} md={3}>
                        <ProductFilter />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <MainContent
                            TableProps={{
                                columns: [],
                                rows: [],
                            }}
                            ButtonAddProps={{
                                textButton: 'Add Product',
                                onClick: () => {
                                    router.push(ROUTES.ADMIN_ADD_PRODUCT);
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

Products.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Products;
