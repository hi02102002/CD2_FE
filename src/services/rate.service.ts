import axiosClient from '@/lib/axiosClient';
import { Review, ReviewInput } from '@/types/review';
import { BaseResponse } from '@/types/shared';

class ReviewService {
    async updateReview(
        reviewId: Review['reviewId'],
        fields: ReviewInput,
    ): Promise<BaseResponse<any>> {
        return await axiosClient.put(`/api/review`, fields, {
            params: {
                reviewId,
            },
        });
    }

    async getAllReviewsForUser(): Promise<BaseResponse<Review[]>> {
        return await axiosClient.get('/api/review?isReview=false');
    }

    async getAllReviewsForProduct(
        productId: number,
        page?: number,
    ): Promise<
        BaseResponse<{
            totalElements: number;
            totalPages: number;
            content: Review[];
        }>
    > {
        return await axiosClient.get(`/api/review/getAll`, {
            params: {
                productId,
                page,
                limit: 5,
            },
        });
    }
}

const reviewService = new ReviewService();

export default reviewService;
