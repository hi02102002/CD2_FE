import { Box } from '@mui/material';

import { Banner, SectionCategory } from '@/components/pages/home';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const Home: NextPageWithLayout = () => {
    return (
        <Box>
            <Banner />
            <SectionCategory />
        </Box>
    );
};

Home.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export default Home;
