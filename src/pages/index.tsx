import { GetServerSideProps } from 'next';

import { Box } from '@mui/material';

import {
    Banner,
    SectionCategories,
    SectionProducts,
} from '@/components/pages/home';
import { ClientLayout } from '@/layouts/client';
import axiosClient from '@/lib/axiosClient';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';

type Props = {
    categories: Category[];
    products: Product[];
};

const Home: NextPageWithLayout<Props> = ({ categories, products }) => {
    return (
        <Box>
            <Banner />
            <SectionCategories categories={categories} />
            <SectionProducts products={products} />
        </Box>
    );
};

Home.getLayout = (page) => {
    return (
        <ClientLayout
            title="MimimogShop"
            description={`Looking for the best deals on everything? Check us out - we've got all the best shopping options covered! from clothes to appliances, we have it all!`}
        >
            {page}
        </ClientLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await axiosClient
        .get('/api/category/all')
        .then((d) => d.data)
        .catch((e) => console.log(e));

    const products = await axiosClient
        .get('/api/product/filter', {
            params: {
                limit: 8,
            },
        })
        .then((d) => d.data?.content)
        .catch((e) => console.log(e));

    return {
        props: {
            categories: categories || [],
            products,
        },
    };
};

export default Home;
