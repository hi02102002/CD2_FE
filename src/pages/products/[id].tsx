
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
import axiosServer from '@/lib/axiosServer';
import { Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import { getCookies } from 'cookies-next';
import { GetServerSideProps } from 'next';
type Props = {
    product: Product;
    relatives: Product[];
};

const Product: NextPageWithLayout<Props> = ({ product, relatives }) => {

    return (
        <>

            <Box className="container-app">
                <ProductMainContent
                    container
                    className="product-main-content"
                    padding={0}
                    spacing={16}
                >
                    <ImageLibrary imageURL={product.imageUrl} />
                    <ProductInfo product={product} />
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
    return <ClientLayout title={page.props.product.name} description={page.props?.product?.description}
        seo={{
            openGraph: {
                title: page.props?.product?.name,
                description: page?.props.product?.description,
                images: page.props?.product.imageUrl?.split(',').filter((v: string) => v !== '').map((v: string) => {
                    return {
                        url: v,
                    }
                }),
                url: `https://minimogshop.vercel.app/products/${page?.props?.product.id}`,
                site_name: 'Minimog Shop',
            },

        }}
    >
        <PageTop
            title="Shop"
            breadcrumbItems={[
                {
                    href: ROUTES.HOME,
                    name: 'Home',
                },
                {
                    href: `${ROUTES.PRODUCTS}/${page.props.product.id}`,
                    name: 'Linen Check Blazer',
                },
            ]}
        />
        {page}</ClientLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const productId = ctx.params?.id as string;

    const { auth_token } = getCookies({ req: ctx.req, res: ctx.res });


    let product: Product | null = null;
    let relatives: Array<Product> = [];

    try {
        product = await axiosServer(auth_token as string)
            .get('/api/product/getOne', {
                params: {
                    id: productId,
                },
            })
            .then((v) => v.data?.data as Product);
        if (!product) {
            return {
                notFound: true,
            }

        }

        console.log(product)

        const res = await axiosServer(auth_token as string)
            .get('/api/product/filter', {
                params: {
                    categoryIds: product.categoryId,
                    limit: 8,
                },
            })
            .then((d) => {
                return {
                    products: d.data?.data?.content.filter((p: Product) => p.id !== product?.id) as Product[],
                };
            });
        relatives = res.products;

    } catch (error) {
        return {
            notFound: true,
        }
    }


    return {
        props: {
            product,
            relatives: relatives || []
        },
    };
};

const ProductMainContent = styled(Grid)`
    padding: 0 ${pxToRem(20)};
`;
export default Product;
