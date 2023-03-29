import axiosClient from '@/lib/axiosClient';
import { BaseResponse } from '@/types/shared';

class ProductService {
    async addProduct(fields: any): Promise<BaseResponse<any>> {
        const formData = new FormData();

        for (const [key, value] of Object.entries(fields)) {
            if (key === 'files' || key === 'file') {
                for (const file of value as any) {
                    formData.append('file', file as string);
                }
            } else {
                formData.append(key, value as string);
            }
        }

        return await axiosClient.post('/api/product', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    async addOptions(fields: any) {
        return await axiosClient.post('/api/product/options', { ...fields });
    }
}

const productService = new ProductService();

export default productService;
