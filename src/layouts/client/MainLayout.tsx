import dynamic from 'next/dynamic';

import { Box, BoxProps } from '@mui/system';
import { NextSeo, NextSeoProps } from 'next-seo';

import h1 from '@/assets/h1_slide_01.jpg';
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
    title: string;
    description: string;
    seo?: Omit<NextSeoProps, 'title' | 'description'>;
} & BoxProps;

const MainLayout = ({
    MainProps,
    children,
    title,
    description,
    seo,
    ...rest
}: Props) => {
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                {...seo}
                openGraph={{
                    title: title || 'MinimogShop',
                    description:
                        description ||
                        'Are you tired of waiting in line at the store? Check out our cart! It makes shopping a breeze!',
                    images: [
                        {
                            url: h1.src,
                            alt: 'MinimogShop',
                            width: h1.width,
                            height: h1.height,
                        },
                    ],
                    ...seo?.openGraph,
                }}
            />
            <Box component="div" {...rest}>
                <Header />
                <Box {...MainProps} component="main">
                    {children}
                </Box>
                <ButtonScrollTop />
                <MessengerChatComponent
                    pageId="110141722038322"
                    themeColor={'#000000'}
                    language="en_US"
                    bottomSpacing={74}
                    loggedInGreeting="Do you need any help?"
                    loggedOutGreeting="See you again"
                    greetingDialogDisplay={'show'}
                    debugMode={true}
                />
                <Footer />
            </Box>
        </>
    );
};

export default MainLayout;
