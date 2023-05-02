export type Product = {
    id: number;
    name: string;
    imageURL: string;
    imageUrl: string;
    price: number;
    description: string;
    quantity: number;
    categoryId: number;
    options: Option[];
    discountPercent: number;
    isDelete: boolean;
    countReviews: number | null;
    averageRating: number | null;
};

export type Option = {
    [key: string]: any;
};

export type OptionKeyValues = {
    key: string;
    values: Array<{
        name: any;
        price: number | null;
        quantity: number | null;
    }>;
};

export type CartItem = {};
