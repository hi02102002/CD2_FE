import { create } from 'zustand';

interface Product {
    href1: string;
    productName: string;
    id: string;
    price: number;
    discount: string;
    quantity: number;
}
interface CartState {
    arrProducts: Product[];
    addProduct: (newProduct: object) => void;
    removeProduct: (id: string) => void;
    clearProduct: () => void;
}

const useCart = create<CartState>()((set) => ({
    arrProducts: [],
    addProduct: (newProduct: any) => {
        set((state) => ({ arrProducts: [...state.arrProducts, newProduct] }));
    },
    removeProduct: (uuid: string) => {
        set((state) => ({
            arrProducts: state.arrProducts.filter(
                (product) => product.id !== uuid,
            ),
        }));
    },
    clearProduct: () => {
        set(() => ({
            arrProducts: [],
        }));
    },
}));

export default useCart;
