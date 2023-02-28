import { Box, BoxProps } from '@mui/system';

import { ButtonScrollTop } from '@/components/client';

import Footer from './Footer';
import Header from './Header';

type Props = {
    MainProps?: BoxProps;
} & BoxProps;

const MainLayout = ({ MainProps, children, ...rest }: Props) => {
    return (
        <Box component="div" {...rest}>
            <Header />
            <Box {...MainProps} component="main">
                {children}
            </Box>
            <ButtonScrollTop />
            <Footer />
        </Box>
    );
};

export default MainLayout;
