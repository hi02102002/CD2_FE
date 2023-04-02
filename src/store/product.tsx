import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import productService from '@/services/product.service';
import { Product } from '@/types/product';

type ProductState = {
    products: Product[];
    total: number;
    isLoadingFetch: boolean;
    fetchProducts: (q?: any) => Promise<void>;
    removeProducts: (ids: Array<Product['id']>) => Promise<void>;
};

const useProductStore = create<ProductState>()(
    devtools(
        immer((set) => {
            return {
                products: [],
                total: 0,
                isLoadingFetch: false,
                async fetchProducts(q) {
                    try {
                        const res = await productService
                            .fetchProducts(q)
                            .then((v) => v.data);
                        set((state) => {
                            state.products = res.content;
                            state.total = res.totalElements;
                        });
                    } catch (error) {}
                },
                async removeProducts(ids) {
                    await productService.removeProducts(ids);
                    set((state) => {
                        state.products = state.products.filter(
                            (product) => !ids.includes(product.id),
                        );
                    });
                },
            };
        }),
        {
            name: 'product',
        },
    ),
);

export default useProductStore;
