import React, { useState } from 'react';

import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { BoxProps } from '@mui/system';

import { DEVICE } from '@/constants';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const handleToggleSidebar = () => {
        setIsOpenSidebar((isOpen) => !isOpen);
    };

    return (
        <Box
            component="div"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header
                onToggleSidebar={handleToggleSidebar}
                isOpenSidebar={isOpenSidebar}
            />
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flex: '1',
                }}
            >
                <Sidebar
                    isOpen={isOpenSidebar}
                    onClose={() => {
                        setIsOpenSidebar(!isOpenSidebar);
                    }}
                />
                <StyledMain component="main">{children}</StyledMain>
            </Box>
        </Box>
    );
};

const StyledMain = styled(Box)<BoxProps>`
    width: 100%;
    padding-top: ${({ theme }) => theme.size.height.header};
    transition: padding-left 0.3s ease;
    padding-left: 0;
    background-color: ${grey[300]};

    @media ${DEVICE.tablet} {
        padding-left: ${({ theme }) => theme.size.width.sidebar};
    }
`;

export default MainLayout;
