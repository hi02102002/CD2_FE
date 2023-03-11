import React from 'react';

import { Box, styled } from '@mui/material';

import { DEVICE } from '@/constants';

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

    @media screen and (${DEVICE.laptopM}) {
        flex-direction: row;
    }
`;

export default MainLayout;
