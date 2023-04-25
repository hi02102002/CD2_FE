import axiosClient from '@/lib/axiosClient';
import { BaseResponse } from '@/types/shared';

class PaymentService {
    async createPayment(
        orderId: number,
        fields: {
            amount: number;
            description: string;
            bankCode: string;
        },
    ): Promise<BaseResponse<string>> {
        return await axiosClient.post('/api/payment/create-pay', fields, {
            params: {
                orderId,
            },
        });
    }
}

const paymentService = new PaymentService();

export default paymentService;
