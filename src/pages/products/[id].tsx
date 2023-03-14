import { Box, styled,Grid } from '@mui/material';
import {  PageTop } from '@/components/common';
import {   ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';



import ProductDetailTab from "@/components/pages/product-detail/ProductDetailTab";
import { ImageLibrary, ProductInfo, SlideRelated } from "@/components/pages/product-detail";


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
                <ProductMainContent container className='product-main-content' sx={{padding:'0'}}>
                    <ImageLibrary></ImageLibrary>
                    
                    <ProductInfo></ProductInfo>
                </ProductMainContent>
                <Box component='div' className='product-info-detailed' sx={{marginTop:'50px'}}>
                    <ProductDetailTab></ProductDetailTab>
                </Box>
                <Box component='div' className='products-related'>
                    <SlideRelated></SlideRelated>
                </Box>
            </Box>
        </>
    );
};

Product.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

const ProductMainContent = styled(Grid)`
    padding: 0px 20px;
   
`
export default Product;
