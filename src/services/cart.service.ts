import axiosClient from '@/lib/axiosClient';
import { Cart, CartItemInput } from '@/types/cart';
import { BaseResponse } from '@/types/shared';

class CartService {
    async getUserCart(userId: number): Promise<BaseResponse<Cart>> {
        return axiosClient.get('/api/cart', {
            params: {
                userId,
            },
        });
    }

    async addProductToCart(
        fields: CartItemInput,
        cartId: number,
    ): Promise<any> {
        return axiosClient.post('/api/cart', fields, {
            params: {
                userId: cartId,
            },
        });
    }
}

const cartService = new CartService();

export default cartService;
