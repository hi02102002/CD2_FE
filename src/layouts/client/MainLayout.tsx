import { Box, BoxProps } from '@mui/system';
//@ts-ignore
import MessengerCustomerChat from 'react-messenger-customer-chat';



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
            <MessengerCustomerChat
             pageId="100091055181591"
             appId="3412913902281052"
            />
            <Footer />
        </Box>
    );
};

export default MainLayout;