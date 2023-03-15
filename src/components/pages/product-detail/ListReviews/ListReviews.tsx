import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

function ListReviews() {
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
                <Typography
                    variant="caption"
                    sx={{ fontSize: '14px', color: '#000', fontWeight: '600' }}
                >
                    Cheap price, high quality
                </Typography>
                <StyledRatingComment component="div">
                    <Box component="div" className="rating">
                        <Typography
                            component="legend"
                            sx={{ marginRight: '18px' }}
                        >
                            Customer Rating
                        </Typography>
                        <Rating
                            name="read-only"
                            value={5}
                            readOnly
                            sx={{ fontSize: '16px' }}
                        />
                    </Box>
                    <Box component="div" className="comment" fontSize="16px">
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: '20px' }}
                        >
                            The quality of the shirt is very nice, in general,
                            it is thick, good value for money so buy it, I
                            guarantee it. Will be back for more support haha
                        </Typography>
                        <Typography variant="body1">
                            Review by{' '}
                            <strong
                                style={{ fontWeight: '600', color: '#000' }}
                            >
                                Sơn
                            </strong>
                        </Typography>
                    </Box>
                </StyledRatingComment>
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
        margin-left: ${pxToRem(24)};
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
