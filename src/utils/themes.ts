import { createTheme } from '@mui/material';
import { common, orange } from '@mui/material/colors';
import { Jost } from '@next/font/google';

import { pxToRem } from './pxToRem';

export const JostFont = Jost({
    variable: '--jost-font',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['italic', 'normal'],
    fallback: ['system-ui', 'arial'],
});

export const theme = createTheme({
    status: {
        danger: orange[500],
    },
    themeColor: {
        primary: '#222',
        title: '#222',
        body: '#666',
    },
    typography: {
        fontFamily: 'var(--font-base)',
        body1: {
            color: '#666',
        },
        h1: {
            color: common.black,
            lineHeight: 1.3,
            fontSize: 45,
            fontWeight: 600,
        },
        h2: {
            color: common.black,
            fontWeight: 600,
            lineHeight: 1.428,
            fontSize: 36,
        },
        h3: {
            color: common.black,
            fontWeight: 600,
            lineHeight: 1.428,
            fontSize: 24,
        },
        h4: {
            color: common.black,
            fontWeight: 600,
            lineHeight: 1.428,
            fontSize: 18,
        },
    },
    spacing: (factor: number) => `${factor / 16}rem`,
    breakpoints: {
        values: {
            xs: 0,
            sm: 425,
            md: 768,
            lg: 1024,
            xl: 1200,
        },
    },
    size: {
        height: {
            header: pxToRem(60),
        },
        width: {
            sidebar: pxToRem(230),
        },
    },
    button: {
        primary: {
            background: '#222',
            color: '#fff',
            border: '#222',
        },
        secondary: {
            background: '#fff',
            color: '#222',
            border: '#222',
        },
    },
});
