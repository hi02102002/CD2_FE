export type Product = {
    id: number;
    name: string;
    imageURL: string;
    price: number;
};

export type Option = {
    [key: string]: any;
    quantity: null | number;
    price: null | number;
};
