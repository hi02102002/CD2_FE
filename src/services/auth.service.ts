import axios from 'axios';
import { omit } from 'lodash';

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

    async requestForgotPassword(email: string) {
        return await axiosClient.post(
            '/api/user/resetPassword',
            {},
            {
                params: {
                    email,
                },
            },
        );
    }

    async resetPassword(fields: {
        confirmPassword: string;
        password: string;
        token: string;
    }) {
        return await axiosClient.post(
            '/api/user/savePassword',
            {
                ...omit(fields, ['token']),
            },
            {
                params: {
                    token: fields.token,
                },
            },
        );
    }

    async changePassword(fields: {
        oldPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }) {
        return await axiosClient.put('/api/user/changePassword', fields);
    }

    async changeInfo(
        fields: Omit<User, 'id' | 'roles' | 'email'>,
    ): Promise<BaseResponse<Omit<User, 'id' | 'roles' | 'email'>>> {
        return await axiosClient.put('/api/user', fields);
    }

    async getAllUser(q?: { page?: number; limit?: number }): Promise<
        BaseResponse<{
            totalElements: number;
            totalPages: number;
            content: User[];
        }>
    > {
        return await axiosClient.get('/api/user/get-all', {
            params: {
                offset: q?.page,
                limit: q?.limit,
            },
        });
    }
}

const authService = new AuthService();

export default authService;
