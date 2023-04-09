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
};

export type OptionSelected = {
    [key: string]: string | undefined;
};
