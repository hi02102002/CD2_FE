import axiosClient from '@/lib/axiosClient';
import {
    Cart,
    CartItem,
    CartItemInput,
    UpdateCartItemInput,
} from '@/types/cart';
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
    ): Promise<BaseResponse<CartItem>> {
        return axiosClient.post('/api/cart', fields, {
            params: {
                userId: cartId,
            },
        });
    }

    async removeProductFromCart(
        cartItemId: number,
    ): Promise<BaseResponse<CartItem>> {
        return axiosClient.delete('/api/cart', {
            params: {
                cartItemId,
            },
        });
    }

    async updateCartItem(
        fields: UpdateCartItemInput,
    ): Promise<BaseResponse<CartItem>> {
        return axiosClient.put('/api/cart', fields);
    }

    async clearCart() {
        return axiosClient.delete('/api/cart/delete-all');
    }
}

const cartService = new CartService();

export default cartService;
