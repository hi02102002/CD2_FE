export {};

type Options = {
    isAdmin: boolean;
    isProtect: boolean;
};

export type WithProtect = <
    T extends Record<string, unknown> = Record<string, unknown>,
>(
    options: Options,
) => T;
