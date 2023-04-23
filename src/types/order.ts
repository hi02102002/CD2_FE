import { CartItem } from './cart';

export enum OrderStatus {
    Pending = 'pending',
    Cancel = 'cancel',
    Delivering = 'delivering',
    Success = 'success',
    Received = 'received',
}

export type Order = {
    orderId: number;
    userId: number;
    email: string;
    fullName: string;
    address: string;
    phoneNumber: string;
    status: OrderStatus;
    totalPrice: number;
    orderItemsResponses: Array<CartItem>;
    createdDate: string | null;
};

export type OrderInput = Pick<
    Order,
    'email' | 'fullName' | 'phoneNumber' | 'status'
> & {
    cartItemIds: number[];
    addressId: number;
};
