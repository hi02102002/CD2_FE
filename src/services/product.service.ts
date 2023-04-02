import axiosClient from '@/lib/axiosClient';
import { Option, Product } from '@/types/product';
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

    async fetchProducts(q?: any): Promise<
        BaseResponse<{
            content: Array<Product>;
            totalElements: number;
        }>
    > {
        return await axiosClient.get('/api/product/filter', {
            params: q,
        });
    }

    async removeProducts(ids: Array<Product['id']>): Promise<void> {
        return axiosClient.delete(`/api/product`, {
            params: {
                productIds: ids.join(','),
            },
        });
    }

    async fetchOptionsById(productId: Product['id']): Promise<Array<Option>> {
        return axiosClient
            .get('/api/product/options', {
                params: {
                    productId,
                },
            })
            .then((v) => v.data);
    }

    async removeOptionByProductId(
        productId: Product['id'],
        fields: { [key: string]: any },
    ) {
        return axiosClient.delete('/api/product/options/delete', {
            params: {
                productId,
            },
            data: [fields],
        });
    }

    async updateOptionsByProductId(productId: Product['id'], fields: Option[]) {
        return axiosClient.put('/api/product/options', fields, {
            params: {
                productId,
            },
        });
    }

    async updateProduct(productId: Product['id'], fields: any) {
        const formData = new FormData();

        for (const [key, value] of Object.entries(fields)) {
            if (key === 'files' || key === 'file') {
                for (const file of value as any) {
                    formData.append('file', file);
                }
            } else {
                formData.append(key, value as string);
            }
        }

        return axiosClient.put('/api/product', formData, {
            params: {
                id: productId,
            },
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}

const productService = new ProductService();

export default productService;