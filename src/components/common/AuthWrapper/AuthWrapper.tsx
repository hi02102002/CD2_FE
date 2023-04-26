import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { getCookie } from 'cookies-next';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { ROUTES } from '@/constants';
import useAuthStore from '@/store/auth';

type Props = {
    children: React.ReactNode;
};

const ROUTERS_AUTH = [
    ROUTES.ACCOUNT,
    ROUTES.ACCOUNT_ADDRESS,
    ROUTES.ACCOUNT_ORDER,
    ROUTES.ACCOUNT_ORDER,
    ROUTES.ADMIN,
    ROUTES.ADMIN,
    ROUTES.ADMIN_ADD_PRODUCT,
    ROUTES.ADMIN_CATEGORY,
    ROUTES.ADMIN_CUSTOMER,
    ROUTES.ADMIN_DISCOUNT,
    ROUTES.ADMIN_EDIT_PRODUCT,
    ROUTES.ADMIN_PRODUCT,
    ROUTES.CHANGE_PASS,
    ROUTES.CHECKOUT,
    ROUTES.ACCOUNT_CHANGE_INFO,
    ROUTES.ACCOUNT_PRODUCT_REVIEW,
    ROUTES.CART,
];

const AuthWrapper = ({ children }: Props) => {
    const { accessToken, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (accessToken) {
            const decoded = jwtDecode<JwtPayload>(accessToken);
            if (
                decoded.exp &&
                decoded.exp * 1000 - 10 * 1000 < Date.now() // thoi gian het han - 10 giay < daynow
            ) {
                logout();
                if (ROUTERS_AUTH.includes(router.pathname)) {
                    router.replace(ROUTES.LOGIN);
                }
            }
            interval = setInterval(() => {
                if (
                    decoded.exp &&
                    decoded.exp * 1000 - 10 * 1000 < Date.now() // thoi gian het han - 10 giay < daynow
                ) {
                    logout();
                    if (ROUTERS_AUTH.includes(router.pathname)) {
                        router.replace(ROUTES.LOGIN);
                    }
                }
            }, 10 * 60 * 1000);
        }
        return () => {
            interval && clearInterval(interval);
        };
    }, [accessToken, logout, router]);

    useEffect(() => {
        const auth_token = getCookie('auth_token');
        if (!auth_token || !accessToken) {
            logout();
            if (ROUTERS_AUTH.includes(router.pathname)) {
                router.replace(ROUTES.LOGIN);
            }
        }
    }, [accessToken, logout, router]);

    return <>{children}</>;
};

export default AuthWrapper;
