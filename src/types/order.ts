import { CartItem } from './cart';

export enum OrderStatus {
    Pending = 'pending',
    Accepted = 'accepted',
    Rejected = 'rejected',
    Delivering = 'delivering',
    Delivered = 'delivered',
    Success = 'success',
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
};

export type OrderInput = Pick<
    Order,
    'email' | 'fullName' | 'phoneNumber' | 'status'
> & {
    cartItemIds: number[];
    addressId: number;
};
