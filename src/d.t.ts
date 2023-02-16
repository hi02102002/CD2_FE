export {};

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        themeColor: {
            primary: string;
        };
        size: {
            height: {
                header: string;
            };
            width: {
                sidebar: string;
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
        };
        size?: {
            height?: {
                header?: string;
            };
            width?: {
                sidebar?: string;
            };
        };
    }
}
