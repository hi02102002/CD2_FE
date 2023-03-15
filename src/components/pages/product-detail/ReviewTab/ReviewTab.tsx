import { Box } from '@mui/material';

import ListReviews from '../ListReviews';
import ReviewForm from '../ReviewForm';

function ReviewTab() {
    return (
        <Box component="div">
            <ListReviews />
            <ReviewForm />
        </Box>
    );
}

export default ReviewTab;
