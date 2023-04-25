export type Review = {
    reviewId: number;
    description: string;
    rating: number;
    price: number;
    productName: string;
    quantityOrder: number;
    fullName: string;
};

export type ReviewInput = Pick<Review, 'description' | 'rating'>;
