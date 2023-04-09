import { uniqBy } from 'lodash';

import { Product } from '@/types/product';

export const optionsKeyValues = (options: Product['options']) => {
    if (options.length === 0) {
        return [];
    }

    const keys = Object.keys(options[0]).filter(
        (key) => key !== 'price' && key !== 'quantity',
    ); // lay ra 2 key khac price va quantity

    return keys.map((key) => {
        // lay ra cac gia tri cua option co key la key hien tai
        const values = uniqBy(
            options.map((obj) => {
                return {
                    name: obj[key],
                    price: obj.price,
                    quantity: obj.quantity,
                };
            }),
            'name',
        );
        return { key, values };
    });
};
