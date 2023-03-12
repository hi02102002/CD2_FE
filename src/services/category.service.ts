import axiosClient from '@/lib/axiosClient';
import { Category, FormInputs as CategoryInput } from '@/types/category';
import { BaseResponse } from '@/types/shared';

class CategoryService {
    async addCategory(data: CategoryInput): Promise<BaseResponse<Category>> {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value as string);
        }
        return axiosClient.post('/api/category', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    async removeCategory(ids: Array<Category['id']>): Promise<void> {
        console.log(ids.join(','));
        return axiosClient.delete(`/api/category/delete`, {
            params: {
                ids: ids.join(','),
            },
        });
    }

    async updateCategory(
        id: Category['id'],
        data: CategoryInput,
    ): Promise<BaseResponse<Category>> {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value as string);
        }
        return axiosClient.put(`/api/category/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    async getAllCategory(q?: { offset?: number; limit?: number }): Promise<
        BaseResponse<{
            currentPage: number;
            totalItems: number;
            totalPages: number;
            categories: {
                content: Category[];
            };
        }>
    > {
        return axiosClient.get('/api/category', {
            params: {
                ...q,
                sortBy: 'id',
            },
        });
    }
}

const categoryService = new CategoryService();
export default categoryService;
