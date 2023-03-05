import axiosClient from '@/lib/axiosClient';
import { FormInputs as CategoryInput } from '@/types/category';

class CategoryService {
    async addCategory(data: CategoryInput) {
        const formData = new FormData();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value as string);
        }
        return axiosClient.post('/api/category', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}

const categoryService = new CategoryService();
export default categoryService;
