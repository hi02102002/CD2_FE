import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { CartItem } from '@/types/product';

interface CartState {
    cartItems: CartItem[];
    addProductToCart: (cartItem: CartItem) => Promise<void>;
    removeProductFromCart: (cartItemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    updateProductQuantity: (
        cartItemId: string,
        quantity: number,
    ) => Promise<void>;
    fetchCart: () => Promise<void>;
}

const useCartStore = create<CartState>()(
    devtools(
        immer((set) => {
            return {
                cartItems: [],
                addProductToCart: async (cartItem) => {
                    //
                },
                removeProductFromCart: async (cartItemId) => {
                    //
                },
                clearCart: async () => {
                    //
                },
                updateProductQuantity: async (cartItemId, quantity) => {
                    //
                },
                fetchCart: async () => {
                    //
                },
            };
        }),
        {
            name: 'cart',
        },
    ),
);

export default useCartStore;