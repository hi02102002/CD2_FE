export {};

type Options = {
    isAdmin: boolean;
    isProtect: boolean;
};

type WithProtect = <
    T extends Record<string, unknown> = Record<string, unknown>,
>(
    options: Options,
) => string;
