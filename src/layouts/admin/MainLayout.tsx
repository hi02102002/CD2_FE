import React, { useLayoutEffect, useState } from 'react';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:767px)');
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

    const handleToggleSidebar = () => {
        setIsOpenSidebar((isOpen) => !isOpen);
    };

    useLayoutEffect(() => {
        if (isMobile) {
            setIsOpenSidebar(false);
        } else {
            setIsOpenSidebar(true);
        }
    }, [isMobile]);

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
                <Box
                    component="main"
                    sx={{
                        marginLeft: isOpenSidebar
                            ? isMobile
                                ? 0
                                : theme.size.width.sidebar
                            : 0,
                        width: '100%',
                        marginTop: theme.size.height.header,
                        transition: 'margin-left 0.3s ease',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
