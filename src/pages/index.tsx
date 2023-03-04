import { Box } from '@mui/material';

import {
    Banner,
    SectionCategories,
    SectionProducts,
} from '@/components/pages/home';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const Home: NextPageWithLayout = () => {
    return (
        <Box>
            <Banner />
            <SectionCategories />
            <SectionProducts />
        </Box>
    );
};

Home.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export default Home;
