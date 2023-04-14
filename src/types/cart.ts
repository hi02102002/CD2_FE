export type CartItemInput = {
    productId: number;
    option: {
        [key: string]: string;
    };
    quantity: number;
};

export type Cart = {
    id: number;
    userId: number;
    cartItems: CartItem[];
    totalPrice: number;
};

export type CartItem = {
    productName: string;
    imageUrl: string;
    option: {
        [key: string]: string;
    };
    quantity: number;
    price: number;
    cartItemId: number;
    productId: number;
};

export type UpdateCartItemInput = Omit<
    CartItem,
    'imageUrl' | 'productName' | 'price'
>;

export type OptionSelected = {
    [key: string]: string | undefined;
};
