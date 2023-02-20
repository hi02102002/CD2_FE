import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';
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
    },
    spacing: (factor: number) => `${factor / 16}rem`,
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
