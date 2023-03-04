import axiosClient from '@/lib/axiosClient';

class AuthService {
    async login(email: string, password: string) {
        return await axiosClient.post('/auth/signin', {
            email,
            password,
        });
    }
}

const authService = new AuthService();

export default authService;
