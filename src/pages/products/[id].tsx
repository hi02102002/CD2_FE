import { Box, Grid, styled } from '@mui/material';

import { PageTop } from '@/components/common';
import {
    ImageLibrary,
    ProductDetailTab,
    ProductInfo,
    SlideRelated,
} from '@/components/pages/product-detail';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Product: NextPageWithLayout<Props> = () => {
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
                        href: ROUTES.PRODUCT_DETAIL,
                        name: 'Linen Check Blazer',
                    },
                ]}
            />
            <Box className="container-app">
                <ProductMainContent
                    container
                    className="product-main-content"
                    padding={0}
                    spacing={16}
                >
                    <ImageLibrary />
                    <ProductInfo />
                </ProductMainContent>
                <Box
                    component="div"
                    className="product-info-detailed"
                    marginTop={50}
                >
                    <ProductDetailTab />
                </Box>
                <Box component="div" className="products-related">
                    <SlideRelated />
                </Box>
            </Box>
        </>
    );
};

Product.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

const ProductMainContent = styled(Grid)`
    padding: 0 ${pxToRem(20)};
`;
export default Product;
