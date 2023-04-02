import React, { createContext, useCallback, useContext } from 'react';



import { useRouter } from 'next/router';



import { ROUTES } from '@/constants';


type FilterOption = {
    offset?: number;
    categoryIds?: number;
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

    const { offset, categoryIds, size, color, minPrice, maxPrice, sort, name } =
        router.query;

    const handelFilter = useCallback(
        ({
            categoryIds,
            color,
            maxPrice,
            minPrice,
            offset,
            size,
            sort,
        }: FilterOption) => {
            const { query } = router;

            if (offset) {
                query.offset = `${offset}`;
            }

            if (categoryIds) {
                query.categoryIds = `${categoryIds}`;
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
                    offset: offset ? Number(offset) : undefined,
                    categoryIds: categoryIds ? Number(categoryIds) : undefined,
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