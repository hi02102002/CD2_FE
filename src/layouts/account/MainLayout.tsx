import React from 'react';

import { Box, styled } from '@mui/material';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <LayoutMain className="container-app">
            <Sidebar />
            {children}
        </LayoutMain>
    );
};

const LayoutMain = styled(Box)`
    display: flex;
    flex-direction: column-reverse;
    gap: ${pxToRem(16)};

    @media screen and (${DEVICE.laptopM}) {
        flex-direction: row;
    }

    .main-content {
        flex: 1;
    }
`;

export default MainLayout;
