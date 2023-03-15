import React, { createContext, useCallback, useContext } from 'react';

import { useRouter } from 'next/router';

import { ROUTES } from '@/constants';

type FilterOption = {
    page?: number;
    categoryId?: number;
    size?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    name?: string;
};

type FilterCtx = {
    handelFilter: (options: FilterOption) => void;
    options: FilterOption;
    handelClear: () => void;
};

const FilterContext = createContext<FilterCtx>({
    handelFilter: () => {
        //
    },
    options: {},
    handelClear: () => {
        //
    },
});

type Props = {
    children: React.ReactNode;
};

const FilterProvider = ({ children }: Props) => {
    const router = useRouter();

    const { page, categoryId, size, color, minPrice, maxPrice, sort, name } =
        router.query;

    const handelFilter = useCallback(
        ({
            categoryId,
            color,
            maxPrice,
            minPrice,
            page,
            size,
            sort,
        }: FilterOption) => {
            const { query } = router;

            if (page) {
                query.page = `${page}`;
            }

            if (categoryId) {
                query.categoryId = `${categoryId}`;
            }

            if (color) {
                query.color = color;
            }

            if (size) {
                query.size = size;
            }

            if (sort) {
                query.sort = sort;
            }

            if (minPrice !== undefined) {
                query.minPrice = `${minPrice}`;
            }

            if (maxPrice !== undefined) {
                query.maxPrice = `${maxPrice}`;
            }

            router.push({
                pathname: router.pathname,
                query: router.query,
            });
        },
        [router],
    );

    const handelClear = useCallback(() => {
        router.push(ROUTES.PRODUCTS);
    }, [router]);

    return (
        <FilterContext.Provider
            value={{
                handelFilter,
                options: {
                    page: page ? Number(page) : undefined,
                    categoryId: categoryId ? Number(categoryId) : undefined,
                    size: size as string,
                    color: color as string,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined,
                    sort: sort as string,
                    name: name as string,
                },
                handelClear,
            }}
        >
            <>{children}</>
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);

export default FilterProvider;
