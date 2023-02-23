import { Box, BoxProps } from '@mui/system';

import Footer from '@/components/common/Footer';

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
        </Box>
    );
};

export default MainLayout;
