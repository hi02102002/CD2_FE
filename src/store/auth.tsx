import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import authService from '@/services/auth.service';
import { User } from '@/types/user';

type AuthState = {
    user: User | null;
    accessToken: string | null;
    setAuth: (data: { accessToken: string | null; user: User | null }) => void;
    logout: () => Promise<void>;
    updateInfor: (data: Omit<User, 'id' | 'roles' | 'email'>) => Promise<void>;
};

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            immer((set) => {
                return {
                    accessToken: null,
                    user: null,
                    setAuth: (data) =>
                        set((state) => {
                            state.accessToken = data.accessToken;
                            state.user = data.user;
                        }),
                    logout: async () => {
                        await authService.logout();
                        deleteCookie('auth_token', {
                            domain: process.env.NEXT_PUBLIC_DOMAIN,
                            path: '/',
                        });
                        deleteCookie('roles', {
                            domain: process.env.NEXT_PUBLIC_DOMAIN,
                            path: '/',
                        });
                        set({ user: null, accessToken: null });
                    },
                    updateInfor: async (data) => {
                        const res = await authService.changeInfo({
                            fullName: data.fullName,
                            dateOfBirth: data.dateOfBirth,
                            phoneNumber: data.phoneNumber,
                            sex: data.sex,
                        });

                        set((state) => {
                            if (state.user) {
                                state.user = {
                                    ...state.user,
                                    ...res.data,
                                };
                            }
                        });
                    },
                };
            }),
            {
                name: 'auth',
            },
        ),
    ),
);

export default useAuthStore;
