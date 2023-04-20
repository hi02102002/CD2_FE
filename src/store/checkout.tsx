import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type CheckoutState = {
    isSuccessful: boolean;
    setIsSuccessful: (isSuccessful: boolean) => void;
};

const useCheckoutStore = create<CheckoutState>()(
    devtools(
        immer((set, get) => {
            return {
                isSuccessful: false,
                setIsSuccessful(isSuccessful) {
                    set((draft) => {
                        draft.isSuccessful = isSuccessful;
                    });
                },
            };
        }),
        {
            name: 'checkout',
        },
    ),
);

export default useCheckoutStore;
