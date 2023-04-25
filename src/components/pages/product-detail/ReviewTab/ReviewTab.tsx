import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Alert, Box, CircularProgress, Pagination, Stack } from '@mui/material';

import reviewService from '@/services/rate.service';
import { Review } from '@/types/review';

import ListReviews from '../ListReviews';

const cache: {
    [key: string]: {
        total: number;
        reviews: Review[];
    };
} = {};

function ReviewTab() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const router = useRouter();

    useEffect(() => {
        const key = `${router.query.id}-${page}`;
        if (!router.query.id) return;
        if (cache[router.query.id as string]) {
            const { total, reviews } = cache[key];
            setReviews(reviews);
            setTotalPage(total);
            setIsLoading(false);
            return;
        }
        (async () => {
            try {
                setIsLoading(true);
                const res = await reviewService.getAllReviewsForProduct(
                    Number(router.query.id),
                    page,
                );
                setReviews(res.data.content);
                setTotalPage(res.data.totalPages);
                cache[key] = {
                    total: res.data.totalPages,
                    reviews: res.data.content,
                };
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, [router.query.id, page]);

    return (
        <Box component="div">
            {isLoading ? (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={24} />
                </Box>
            ) : reviews.length > 0 ? (
                <>
                    <ListReviews reviews={reviews} />
                    <Stack
                        marginTop={30}
                        direction="row"
                        justifyContent="center"
                    >
                        <Pagination
                            count={totalPage}
                            page={page + 1}
                            onChange={(e, page) => {
                                setPage(page);
                            }}
                        />
                    </Stack>
                </>
            ) : (
                <Box sx={{ padding: 0, marginBottom: 24 }}>
                    <Alert severity="info">This product has no reviews.</Alert>
                </Box>
            )}
        </Box>
    );
}

export default ReviewTab;
