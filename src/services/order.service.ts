import axiosClient from '@/lib/axiosClient';
import { Order, OrderInput, OrderStatus } from '@/types/order';
import { BaseResponse } from '@/types/shared';

class OrderService {
    async checkout(fields: OrderInput): Promise<BaseResponse<number>> {
        return axiosClient.post('/api/order', fields);
    }

    async getOrders(q?: { page?: number; limit?: number }): Promise<
        BaseResponse<{
            content: Array<Order>;
            totalElements: number;
        }>
    > {
        return axiosClient.get('/api/order/get-all', {
            params: {
                offset: q?.page,
                limit: q?.limit,
            },
        });
    }

    async updateStatus(
        id: number,
        status: OrderStatus,
    ): Promise<BaseResponse<Order>> {
        return axiosClient.put(
            `/api/order`,
            {},
            {
                params: {
                    orderId: id,
                    status,
                },
            },
        );
    }

    async getOrdersUser(): Promise<BaseResponse<Array<Order>>> {
        return axiosClient.get('/api/order');
    }
}

const orderService = new OrderService();
export default orderService;
