import axios from 'axios';

import { API_URL } from '@/constants';

const axiosServer = (accessToken: string) => {
    const server = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        withCredentials: true,
    });

    return server;
};

export default axiosServer;
