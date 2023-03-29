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
import { NextPageWithLayout } from '@/types/shared';

type Props = {
    categories: Category[];
};

const Home: NextPageWithLayout<Props> = ({ categories }) => {
    return (
        <Box>
            <Banner />
            <SectionCategories categories={categories} />
            <SectionProducts />
        </Box>
    );
};

Home.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
    const categories = await axiosClient
        .get('/api/category/all')
        .then((d) => d.data)
        .catch((e) => console.log(e));

    return {
        props: {
            categories,
        },
    };
};

export default Home;
