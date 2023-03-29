import dynamic from 'next/dist/shared/lib/dynamic';

import { Box, BoxProps } from '@mui/system';

import { ButtonScrollTop } from '@/components/client';

import Footer from './Footer';
import Header from './Header';

const MessengerChatComponent = dynamic(
    () =>
        import('react-messenger-chat-plugin').then((mcp) => mcp.MessengerChat),
    { ssr: false },
);

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
            <MessengerChatComponent
                pageId="100091055181591"
                themeColor={'#000000'}
                language="en_US"
                bottomSpacing={300}
                loggedInGreeting="loggedInGreeting"
                loggedOutGreeting="loggedOutGreeting"
                greetingDialogDisplay={'show'}
                debugMode={true}
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
