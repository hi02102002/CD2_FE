import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';

import { getCookies, removeCookies } from 'cookies-next';

import { ROUTES } from '@/constants';
import { setState } from '@/features/auth/auth.slice';
import axiosServer from '@/lib/axiosServer';
import { AppStore, wrapper } from '@/store';
import { BaseResponse } from '@/types/shared';
import { ROLE, User } from '@/types/user';

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
    gssp?: (
        ctx: GetServerSidePropsContext,
        store: AppStore,
    ) => GetServerSideProps<P>,
) => (ctx: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>;

export const withProtect: WithProtect = (options) => (gssp) =>
    wrapper.getServerSideProps((store) => async (ctx) => {
        const { isAdmin, isProtect } = options;
        const { auth_token } = getCookies({ req: ctx.req, res: ctx.res });

        console.log(auth_token);

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

        try {
            const user: BaseResponse<User> = await axiosServer(ctx).get('/me');

            if (!user.data.roles.includes(ROLE.ADMIN) && isAdmin) {
                return {
                    redirect: {
                        destination: ROUTES.NOT_ALLOW,
                        permanent: false,
                    },
                };
            }

            if (user) {
                store.dispatch(
                    setState({
                        user,
                        accessToken: auth_token as string,
                    }),
                );
            }
        } catch (error) {
            // console.log(error);
            removeCookies('auth_token');
        }

        if (!gssp) {
            return {
                props: {},
            };
        }

        const result = (await gssp(ctx, store)) as any;

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
    });
