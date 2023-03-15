import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import categoryService from '@/services/category.service';
import { Category, FormInputs as DataInputCategory } from '@/types/category';

type CategoryState = {
    categories: Category[];
    addCategory: (data: DataInputCategory) => Promise<void>;
    removeCategory: (ids: Array<Category['id']>) => Promise<void>;
    fetchCategories: (q?: {
        offset?: number;
        limit?: number;
        name?: string;
    }) => Promise<void>;
    updateCategory: (
        id: Category['id'],
        data: DataInputCategory,
    ) => Promise<void>;
    total: number;
    isLoadingFetch: boolean;
};

const useCategoryStore = create<CategoryState>()(
    devtools(
        immer((set) => {
            return {
                categories: [],
                total: 0,
                addCategory: async (data) => {
                    const category = await categoryService
                        .addCategory(data)
                        .then((value) => value.data);
                    set((state) => {
                        state.categories.push(category);
                    });
                },
                updateCategory: async (id, data) => {
                    const category = await categoryService
                        .updateCategory(id, data)
                        .then((v) => v.data);
                    set((state) => {
                        state.categories = state.categories.map((c) => {
                            if (c.id === category.id) {
                                return {
                                    ...c,
                                    ...category,
                                };
                            }
                            return c;
                        });
                    });
                },
                removeCategory: async (ids) => {
                    await categoryService.removeCategory(ids);
                    set((state) => {
                        state.categories = state.categories.filter(
                            (category) => !ids.includes(category.id),
                        );
                    });
                },
                fetchCategories: async (q) => {
                    try {
                        const res = await categoryService
                            .getAllCategory(q)
                            .then((v) => v.data);
                        set((state) => {
                            state.categories = res.categories.content;
                            state.total = res.totalItems;
                        });
                    } catch (error) {}
                },
                isLoadingFetch: false,
            };
        }),
        {
            name: 'auth',
        },
    ),
);

export default useCategoryStore;
