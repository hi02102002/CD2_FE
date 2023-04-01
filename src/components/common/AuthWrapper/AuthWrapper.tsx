import React, { useEffect } from 'react';

import { getCookie } from 'cookies-next';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import useAuthStore from '@/store/auth';

type Props = {
    children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
    const { accessToken, logout } = useAuthStore();

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (accessToken) {
            const decoded = jwtDecode<JwtPayload>(accessToken);
            if (
                decoded.exp &&
                decoded.exp * 1000 - 10 * 1000 < Date.now() // thoi gian het han - 10 giay < daynow
            ) {
                logout();
            }
            interval = setInterval(() => {
                console.log('hi');
                if (
                    decoded.exp &&
                    decoded.exp * 1000 - 10 * 1000 < Date.now() // thoi gian het han - 10 giay < daynow
                ) {
                    console.log('logout');
                    logout();
                }
            }, 10 * 60 * 1000);
        }
        return () => {
            interval && clearInterval(interval);
        };
    }, [accessToken, logout]);

    useEffect(() => {
        console.log(getCookie('auth_token'));
        const auth_token = getCookie('auth_token');
        if (!auth_token || !accessToken) {
            logout();
        }
    }, [accessToken, logout]);

    return <>{children}</>;
};

export default AuthWrapper;
