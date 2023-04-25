import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { DEVICE } from '@/constants';
import { Review } from '@/types/review';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    reviews: Review[];
};
function ListReviews({ reviews }: Props) {
    return (
        <Box
            component="div"
            className="customer-reviews"
            sx={{ borderBottom: '1px solid #eee' }}
        >
            <Typography variant="h4" marginBottom="30px">
                Customer Reviews
            </Typography>
            <Box
                component="div"
                className="customer-reviews-item"
                sx={{ paddingBottom: '40px' }}
            >
                {reviews?.map((review) => (
                    <StyledRatingComment component="div" key={review.reviewId}>
                        <Box component="div" className="rating">
                            <Typography
                                component="legend"
                                sx={{ marginRight: '18px' }}
                            >
                                Customer Rating
                            </Typography>
                            <Rating
                                name="read-only"
                                value={review.rating}
                                readOnly
                                sx={{ fontSize: '16px' }}
                            />
                        </Box>
                        <Box
                            component="div"
                            className="comment"
                            fontSize="16px"
                        >
                            <Typography
                                variant="body1"
                                sx={{ marginBottom: '20px' }}
                            >
                                {review.description}
                            </Typography>
                            <Typography variant="body1">
                                Review by{' '}
                                <strong
                                    style={{ fontWeight: '600', color: '#000' }}
                                >
                                    {review.fullName}
                                </strong>
                            </Typography>
                        </Box>
                    </StyledRatingComment>
                ))}
            </Box>
        </Box>
    );
}

const StyledRatingComment = styled(Box)`
    margin-top: ${pxToRem(20)};
    display: flex;

    .rating {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .comment {
        margin-left: ${pxToRem(16)};
        flex: 3;
    }

    @media ${DEVICE.mobileS} {
        flex-direction: column;

        .rating {
            margin-bottom: ${pxToRem(16)};
        }

        .comment {
            margin-left: 0px;
        }
    }

    @media ${DEVICE.tablet} {
        flex-direction: row;

        .comment {
            margin-left: ${pxToRem(24)};
        }
    }
`;

export default ListReviews;
