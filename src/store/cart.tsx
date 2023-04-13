import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import cartService from '@/services/cart.service';
import { Cart, UpdateCartItemInput } from '@/types/cart';
import { Option } from '@/types/product';

interface CartState {
    userCart: Cart | null;
    addProductToCart: (fields: {
        productId: number;
        quantity: number;
        optionsSelected: Option;
    }) => Promise<void>;
    removeProductFromCart: (cartItemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    updateProductQuantity: (fields: UpdateCartItemInput) => Promise<void>;
    fetchCart: (userId: number) => Promise<void>;
    totalPrice: number;
    totalQuantity: number;
    setTotalPrice: () => void;
    setTotalQuantity: () => void;
}

const useCartStore = create<CartState>()(
    devtools(
        immer((set, get) => {
            return {
                userCart: null,
                totalPrice: 0,
                totalQuantity: 0,
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
                    set((state) => {
                        if (state.userCart) {
                            const cartItemExist = state.userCart.cartItems.find(
                                (item) =>
                                    item.cartItemId === res.data.cartItemId,
                            );
                            if (!cartItemExist) {
                                state.userCart.cartItems.push(res.data);
                            } else {
                                state.userCart.cartItems =
                                    state.userCart.cartItems.map((item) => {
                                        if (
                                            item.cartItemId ===
                                            res.data.cartItemId
                                        ) {
                                            return {
                                                ...item,
                                                ...res.data,
                                            };
                                        }
                                        return item;
                                    });
                            }
                        }
                    });
                    // //
                },
                removeProductFromCart: async (cartItemId) => {
                    await cartService.removeProductFromCart(cartItemId);
                    set((state) => {
                        if (state.userCart) {
                            state.userCart.cartItems =
                                state.userCart.cartItems.filter(
                                    (item) => item.cartItemId !== cartItemId,
                                );
                        }
                    });
                },
                clearCart: async () => {
                    //
                    await cartService.clearCart();
                    set((state) => {
                        state.userCart = null;
                        state.totalPrice = 0;
                        state.totalQuantity = 0;
                    });
                },
                updateProductQuantity: async (fields) => {
                    //
                    const res = await cartService.updateCartItem({
                        ...fields,
                    });

                    set((state) => {
                        if (state.userCart) {
                            state.userCart.cartItems =
                                state.userCart.cartItems.map((item) => {
                                    if (
                                        item.cartItemId === res.data.cartItemId
                                    ) {
                                        return {
                                            ...item,
                                            ...res.data,
                                        };
                                    }
                                    return item;
                                });
                        }
                    });
                },
                fetchCart: async (userId) => {
                    const userCart = await cartService
                        .getUserCart(userId)
                        .then((v) => v.data);
                    set((state) => {
                        state.userCart = userCart;
                    });
                },
                setTotalPrice: () => {
                    set((state) => {
                        state.totalPrice = state.userCart?.cartItems.reduce(
                            (total, item) => {
                                return total + item.price;
                            },
                            0,
                        ) as number;
                    });
                },
                setTotalQuantity: () => {
                    set((state) => {
                        state.totalQuantity = state.userCart?.cartItems.reduce(
                            (total, item) => {
                                return total + item.quantity;
                            },
                            0,
                        ) as number;
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
