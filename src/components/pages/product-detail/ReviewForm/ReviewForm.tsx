import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Rating, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

interface IFormInputs {
    review: string;
    rating: number;
}

const SignupSChema = yup.object().shape({
    review: yup.string().required(),
});

function ReviewForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: yupResolver(SignupSChema) });

    const onSubmit = (data: IFormInputs) => {
        console.log(data);
    };

    return (
        <StyledReviewForm component="div" className="add-review">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box component="div" color="#000">
                    <Typography
                        variant="caption"
                        sx={{ fontSize: '18px', marginRight: '6px' }}
                    >
                        You are reviewing:
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ fontSize: '18px', fontWeight: '600' }}
                    >
                        Linen Check Blazer
                    </Typography>
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '30px 0',
                    }}
                >
                    <Typography component="legend" sx={{ marginRight: '18px' }}>
                        Your Rating
                    </Typography>

                    <Controller
                        name="rating"
                        control={control}
                        defaultValue={0}
                        rules={{ required: true }}
                        render={({ field: { onChange } }) => (
                            <Rating onChange={onChange} />
                        )}
                    />
                </Box>

                <Box component="div" className="review-field-text">
                    <Controller
                        name="review"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Review"
                                onChange={onChange}
                                value={value}
                                messageError={errors.review?.message}
                                isError={errors.review != undefined}
                                required
                            />
                        )}
                    />
                </Box>

                <Button
                    typeButton="secondary"
                    className="btn-submit-review"
                    type="submit"
                >
                    Submit Review
                </Button>
            </form>
        </StyledReviewForm>
    );
}
const StyledReviewForm = styled(Box)`
    .btn-submit-review {
        margin-top: ${pxToRem(30)};
        font-weight: 600;
    }
`;
export default ReviewForm;
