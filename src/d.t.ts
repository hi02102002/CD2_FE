export {};

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        themeColor: {
            primary: string;
            body: string;
            title: string;
        };
        size: {
            height: {
                header: string;
            };
            width: {
                sidebar: string;
            };
        };
        button: {
            primary: {
                background: string;
                color: string;
                border: string;
            };
            secondary: {
                background: string;
                color: string;
                border: string;
            };
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        themeColor?: {
            primary?: string;
            body?: string;
            title?: string;
        };
        size?: {
            height?: {
                header?: string;
            };
            width?: {
                sidebar?: string;
            };
        };
        button?: {
            primary?: {
                background?: string;
                color?: string;
                border: string;
            };
            secondary?: {
                background?: string;
                color?: string;
                border: string;
            };
        };
    }
}
