/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable react/display-name */
import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { ROUTES } from '@/constants';
import useAuthStore from '@/store/auth';
import { ROLE } from '@/types/user';

type Options = {
    isAdmin: boolean;
    isProtect: boolean;
};

const ROUTES_REDIRECT_AUTH = [
    ROUTES.LOGIN,
    ROUTES.FORGOT_PASS,
    ROUTES.REGISTER,
    ROUTES.RESET_PASS,
];

const withProtect =
    <P extends JSX.IntrinsicAttributes>(options: Options) =>
    (Component: React.FunctionComponent<P>) => {
        const ComponentWithProtect = (props: P) => {
            const { isAdmin, isProtect } = options;
            const { accessToken, user } = useAuthStore();
            const router = useRouter();

            useEffect(() => {
                if (!accessToken && isProtect) {
                    router.back();
                }

                if (
                    accessToken &&
                    ROUTES_REDIRECT_AUTH.includes(router.pathname)
                ) {
                    router.replace(ROUTES.HOME);
                }

                if (user && isAdmin && !user.roles.includes(ROLE.ADMIN)) {
                    router.replace(ROUTES.NOT_ALLOW);
                }
            }, [router, isAdmin, isProtect, accessToken, user]);
            // Your auth logic
            return <Component {...props} />;
        };

        return ComponentWithProtect;
    };

export default withProtect;
