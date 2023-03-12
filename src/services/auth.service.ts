import axios from 'axios';

import axiosClient from '@/lib/axiosClient';
import { BaseResponse } from '@/types/shared';
import { User } from '@/types/user';

class AuthService {
    async login(
        email: string,
        password: string,
    ): Promise<
        BaseResponse<
            User & {
                token: string;
            }
        >
    > {
        return await axiosClient.post('/api/auth/signin', {
            email,
            password,
        });
    }

    async register(data: {
        email: string;
        fullName: string;
        password: string;
    }) {
        return await axiosClient.post('/api/auth/signup', {
            ...data,
            roles: ['user'],
        });
    }

    async logout() {
        await axios.get('/api/logout');
    }
}

const authService = new AuthService();

export default authService;
