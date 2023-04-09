import { useMemo, useState } from 'react';

import { OptionSelected } from '@/types/cart';
import { Product } from '@/types/product';

export const useSelectedProductVariant = (
    productOptions: Product['options'],
) => {
    const [selected, setSelected] = useState<OptionSelected>({});

    const requiredKeys = useMemo(
        () =>
            productOptions.length === 0
                ? []
                : Object.keys(productOptions?.[0]).filter(
                      (key) => key !== 'quantity' && key !== 'price',
                  ),
        [productOptions],
    ); // lay ra ca filed can thiet ngoai tru quantity voi price

    // {sizes:s,price:10,quantity:10,colors:white} => [sizes,white]

    const isSelectAllKeyRequired = useMemo(
        () => requiredKeys.every((key) => selected.hasOwnProperty(key)),
        [requiredKeys, selected],
    ); // check tat cai select phai chua cac key required

    const selectedProductVariant = useMemo(
        () =>
            isSelectAllKeyRequired // neu da chon cac key yeu cau
                ? productOptions?.find((p) => {
                      return Object.keys(selected).every(
                          (key) => p[key] === selected[key],
                      );
                  }) // tim cai option varinat co cap key value bang cap slect key value
                : null,
        [selected, productOptions, isSelectAllKeyRequired],
    );

    console.log({ selected, isSelectAllKeyRequired, selectedProductVariant });

    return {
        setSelected,
        selected,
        isSelectAllKeyRequired,
        selectedProductVariant,
    };
};
