import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type WishlistState = {
    wishlist: any[];
    addToWishlist: (wishlist: any) => Promise<void>;
    removeFromWishlist: (id: any) => Promise<void>;
};

export const useWishlistStore = create<WishlistState>()(
    devtools(
        immer((set) => {
            return {
                wishlist: [],
                async addToWishlist(data) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(data);
                        }, 2000);
                    });
                    set((state) => {
                        state.wishlist.push(data);
                    });
                },
                async removeFromWishlist(id) {
                    //
                },
            };
        }),
    ),
);
