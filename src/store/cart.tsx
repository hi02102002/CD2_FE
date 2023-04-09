import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import cartService from '@/services/cart.service';
import { Cart } from '@/types/cart';
import { Option } from '@/types/product';

interface CartState {
    userCart: Cart | null;
    addProductToCart: (fields: {
        productId: number;
        quantity: number;
        optionsSelected: Option;
    }) => Promise<void>;
    removeProductFromCart: (cartItemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    updateProductQuantity: (
        cartItemId: string,
        quantity: number,
    ) => Promise<void>;
    fetchCart: (userId: number) => Promise<void>;
}

const useCartStore = create<CartState>()(
    devtools(
        immer((set, get) => {
            return {
                userCart: null,
                addProductToCart: async (fields) => {
                    let option: {
                        [key: string]: string;
                    } = {};
                    Object.entries(fields.optionsSelected).forEach(
                        ([key, value]) => {
                            if (key !== 'quantity' && key !== 'price') {
                                option = {
                                    ...option,
                                    [key]: value as string,
                                };
                            }
                        },
                    );
                    const res = await cartService.addProductToCart(
                        {
                            option,
                            productId: fields.productId,
                            quantity: fields.quantity,
                        },
                        get().userCart?.id as number,
                    );
                    console.log(res);
                    // //
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
                fetchCart: async (userId) => {
                    const userCart = await cartService
                        .getUserCart(userId)
                        .then((v) => v.data);
                    set((state) => {
                        state.userCart = userCart;
                    });
                },
            };
        }),
        {
            name: 'cart',
        },
    ),
);

export default useCartStore;
