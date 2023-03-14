import {
    GetServerSidePropsContext,
    GetServerSidePropsResult
} from 'next';

import { getCookies } from 'cookies-next';

import { ROUTES } from '@/constants';
import { ROLE } from '@/types/user';

type Options = {
    isAdmin: boolean;
    isProtect: boolean;
};

const AUTH_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.FORGOT_PASS,
    ROUTES.RESET_PASS,
];

type WithProtect = <
    P extends Record<string, unknown> = Record<string, unknown>,
>(
    options: Options,
) => (
    gssp?: (ctx: GetServerSidePropsContext) =>Promise<GetServerSidePropsResult<P>>,
) => (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>;

export const withProtect: WithProtect = (options) => (gssp) => async (ctx) => {
    const { isAdmin, isProtect } = options;
    const { auth_token, roles } = getCookies({ req: ctx.req, res: ctx.res });

    // neu khong co token va la trang protect redirect ve trang hom

    if (!auth_token && isProtect) {
        return {
            redirect: {
                destination: ROUTES.HOME,
                permanent: false,
            },
        };
    }

    // neu ma co token va la trang auth thi redict ve login
    if (auth_token && AUTH_ROUTES.includes(ctx.resolvedUrl)) {
        return {
            redirect: {
                destination: ROUTES.HOME,
                permanent: false,
            },
        };
    }

    if (isAdmin && !roles?.includes(ROLE.ADMIN)) {
        return {
            redirect: {
                destination: ROUTES.NOT_ALLOW,
                permanent: false,
            },
        };
    }

    if (!gssp) {
        return {
            props: {},
        };
    }

    const result = (await gssp(ctx)) as any;

    if ('props' in result)
        return {
            ...result,
            props: {
                ...result?.props,
            },
        };

    return {
        ...result,
        props: {},
    };
};
