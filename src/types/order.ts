import { CartItem } from './cart';

export enum OrderStatus {
    pending = 'pending',
    cancel = 'cancel',
    delivering = 'delivering',
    success = 'success',
    received = 'received',
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
    paymentId: number;
};

export type OrderInput = Pick<
    Order,
    'email' | 'fullName' | 'phoneNumber' | 'paymentId'
> & {
    cartItemIds: number[];
    addressId: number;
};

export type MethodPayment = {
    paymentId: number;
    paymentName: string;
    paymentCode: string;
};
