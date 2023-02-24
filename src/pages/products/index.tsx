import { useState } from 'react';

import { Stack } from '@mui/material';
import { Box } from '@mui/system';

import { ProductGrid } from '@/components/client';
import { PageTop, Pagination } from '@/components/common';
import { ToolBar } from '@/components/pages/products';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

const LIST_GRID_MODE: Array<2 | 3 | 4 | 5> = [2, 3, 4, 5];

const Products: NextPageWithLayout = () => {
    const [chooseGridMode, setChooseGridMode] = useState(
        LIST_GRID_MODE[LIST_GRID_MODE.length - 1],
    );

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
                        href: ROUTES.PRODUCTS,
                        name: 'Shop',
                    },
                ]}
            />
            <Box marginY={35}>
                <Box component="div" className="container-app">
                    <ToolBar
                        chooseMode={chooseGridMode}
                        listGridMode={LIST_GRID_MODE}
                        onChooseMode={(mode) => {
                            setChooseGridMode(mode);
                        }}
                    />

                    <ProductGrid spacing={16} numCol={chooseGridMode} />
                    <Stack
                        marginTop={30}
                        direction="row"
                        justifyContent="center"
                    >
                        <Pagination count={5} />
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

Products.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export default Products;
