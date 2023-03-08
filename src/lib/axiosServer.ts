import { GetServerSidePropsContext } from 'next';

import axios from 'axios';
import { getCookies } from 'cookies-next';

import { API_URL } from '@/constants';

const axiosServer = (ctx: GetServerSidePropsContext) => {
    const { auth_token } = getCookies({ req: ctx.req, res: ctx.res });

    const server = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${auth_token}`,
        },
    });

    // Add a request interceptor
    server.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        },
    );

    // Add a response interceptor
    server.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response.data;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        },
    );

    return server;
};

export default axiosServer;
