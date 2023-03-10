import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { User } from '@/types/user';

type AuthState = {
    user: User | null;
    accessToken: string | null;
    setAuth: (data: { accessToken: string | null; user: User | null }) => void;
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
                            (state.accessToken = data.accessToken),
                                (state.user = data.user);
                        }),
                };
            }),
            {
                name: 'auth',
            },
        ),
    ),
);

export default useAuthStore;
