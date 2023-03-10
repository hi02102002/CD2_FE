import type { AppProps } from 'next/app';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';

import { GlobalCSS } from '@/components/common';
import { wrapper } from '@/store';
import '@/styles/globals.css';
import { NextPageWithLayout } from '@/types/shared';
import createEmotionCache from '@/utils/createEmotionCache';
import { JostFont, theme } from '@/utils/themes';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();

const App = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) => {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${JostFont.style.fontFamily};
                    --font-base: ${JostFont.style.fontFamily};
                }
            `}</style>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <GlobalCSS />
                    <CssBaseline />
                    <NextNProgress
                        color="#222"
                        height={3}
                        options={{
                            showSpinner: false,
                        }}
                    />
                    <Toaster />
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </CacheProvider>
        </>
    );
};

export default wrapper.withRedux(App);
