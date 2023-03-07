import axiosClient from '@/lib/axiosClient';

class AuthService {
    async login(email: string, password: string) {
        return await axiosClient.post(
            '/auth/signin',
            {
                email,
                password,
            },
            {
                withCredentials: true,
            },
        );
    }

    async register(data: {
        email: string;
        fullName: string;
        password: string;
    }) {
        return await axiosClient.post('/auth/signup', {
            ...data,
            roles: ['user'],
        });
    }
}

const authService = new AuthService();

export default authService;
