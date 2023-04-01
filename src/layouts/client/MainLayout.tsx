import { Box, BoxProps } from '@mui/system';
import { MessengerChat } from 'react-messenger-chat-plugin';

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
            <MessengerChat
                pageId="100091055181591"
                language="sv_SE"
                themeColor={'#000000'}
                bottomSpacing={300}
                loggedInGreeting="loggedInGreeting"
                loggedOutGreeting="loggedOutGreeting"
                greetingDialogDisplay={'show'}
                onMessengerShow={() => {
                    console.log('onMessengerShow');
                }}
                onMessengerHide={() => {
                    console.log('onMessengerHide');
                }}
                onMessengerDialogShow={() => {
                    console.log('onMessengerDialogShow');
                }}
                onMessengerDialogHide={() => {
                    console.log('onMessengerDialogHide');
                }}
                onMessengerMounted={() => {
                    console.log('onMessengerMounted');
                }}
                onMessengerLoad={() => {
                    console.log('onMessengerLoad');
                }}
            />
            <Footer />
        </Box>
    );
};

export default MainLayout;
