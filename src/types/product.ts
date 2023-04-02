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
};

export type Option = {
    [key: string]: any;
    quantity: null | number;
    price: null | number;
};
