import { useEffect, useState } from 'react';

import { Alert, Box, CircularProgress } from '@mui/material';

import { PageTop } from '@/components/common';
import { ReviewTable } from '@/components/pages/account';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import reviewService from '@/services/rate.service';
import { Review } from '@/types/review';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const ProductReview: NextPageWithLayout = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await reviewService.getAllReviewsForUser();
                setReviews(res.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        })();
    }, []);

    const handelReview = (reviewId: number) => {
        const newReviews = reviews.filter(
            (review) => review.reviewId !== reviewId,
        );
        setReviews(newReviews);
    };

    return (
        <Box width="100%">
            {isLoading ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                >
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <>
                    {reviews.length === 0 ? (
                        <Box sx={{ padding: 0, marginBottom: 24 }}>
                            <Alert severity="info">
                                You don&apos;t have any products to review.
                            </Alert>
                        </Box>
                    ) : (
                        <ReviewTable
                            reviews={reviews}
                            onReview={handelReview}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

ProductReview.getLayout = (page) => {
    return (
        <ClientLayout title="My Product Review" description="My Product Review">
            <PageTop
                title="My Product Review"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.ACCOUNT,
                        name: 'Account',
                    },
                    {
                        href: ROUTES.LOGIN,
                        name: 'My Product Review',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default ProductReview;
