import { GetServerSideProps } from 'next';

import { Box, Grid, styled } from '@mui/material';
import { getCookies } from 'cookies-next';

import { PageTop } from '@/components/common';
import {
    ImageLibrary,
    ProductDetailTab,
    ProductInfo,
    SlideRelated,
} from '@/components/pages/product-detail';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import axiosServer from '@/lib/axiosServer';
import { Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import { uniqBy } from 'lodash';
import { useMemo } from 'react';
type Props = {
    product: Product;
    relatives: Product[];
};

const Product: NextPageWithLayout<Props> = ({ product, relatives }) => {


    const optionsKeyValues = useMemo(() => {
        
        if(product?.options.length===0) return [];
        const keys = Object.keys(product.options[0]).filter(key => key !== 'price' && key !== 'quantity'); // lay ra 2 key khac price va quantity

      return keys.map(key => {
            // lay ra cac gia tri cua option co key la key hien tai
          const values = uniqBy(product.options.map(obj => {
            return {
                name: obj[key],
                price: obj.price,
                  quantity: obj.quantity,
              }
          }),'name');
          return { key, values };
        });

    }, [product.options])

    
    console.log(optionsKeyValues)

    return (
        <>
         
            <Box className="container-app">
                <ProductMainContent
                    container
                    className="product-main-content"
                    padding={0}
                    spacing={16}
                >
                    <ImageLibrary imageURL={ product.imageURL} />
                    <ProductInfo product={product} options={optionsKeyValues}/>
                </ProductMainContent>
                <Box
                    component="div"
                    className="product-info-detailed"
                    marginTop={50}
                >
                    <ProductDetailTab />
                </Box>
               {relatives?.length > 0 && <SlideRelated relatives={relatives} />}
            </Box>
        </>
    );
};

Product.getLayout = (page) => {
    return <ClientLayout>
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
        {page}</ClientLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const productId = ctx.params?.id as string;

    const { auth_token } = getCookies({ req: ctx.req, res: ctx.res });

    
   const  product = await axiosServer(auth_token as string)
        .get('/api/product/getOne', {
            params: {
                id: productId,
            },
        })
       .then((v) => v.data?.data as Product);
    
    if (!product) return {
        notFound: true,
    }

        const { products:relatives } = await axiosServer(auth_token as string)
        .get('/api/product/filter', {
            params: {
                categoryIds:product.categoryId,
                limit: 8,
            },
        })
            .then((d) => {
            return {
                products: d.data?.data?.content.filter((p:Product)=>p.id !==product.id) as Product[],
            };
        });


    return {
        props: {
            product,
            relatives:relatives||[]
        },
    };
};

const ProductMainContent = styled(Grid)`
    padding: 0 ${pxToRem(20)};
`;
export default Product;
