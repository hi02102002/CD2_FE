import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Dialog, Rating, Stack, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import {
    Input,
    Label,
    LoadingFullPage,
    MessageError,
    ModalBody,
    ModalFooter,
    ModalHeader,
    TextHover,
    TextLimit,
} from '@/components/common';
import { DEVICE } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import reviewService from '@/services/rate.service';
import { Review } from '@/types/review';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    reviews: Review[];
    onReview: (reviewId: number) => void;
};

const ReviewTable = ({ reviews, onReview }: Props) => {
    return (
        <StyledOrderTable>
            <StyledTHead>
                <StyledTr>
                    <StyedCol component="th" className="id head">
                        Id
                    </StyedCol>
                    <StyedCol component="th" className="name head">
                        Product Name
                    </StyedCol>
                    <StyedCol component="th" className="rating head">
                        Rating
                    </StyedCol>
                    <StyedCol component="th" className="review head">
                        Review
                    </StyedCol>
                    <StyedCol component="th" className="action head">
                        Action
                    </StyedCol>
                </StyledTr>
            </StyledTHead>
            <StyledTBody>
                {reviews.map((review) => (
                    <Row
                        key={review.reviewId}
                        review={review}
                        onReview={onReview}
                    />
                ))}
            </StyledTBody>
        </StyledOrderTable>
    );
};

const schema = yup.object({
    rating: yup
        .number()
        .required('Please select rating')
        .min(1, 'Rating must be greater than 0')
        .max(5, 'Rating must be less equal 5'),
    description: yup.string().required('Please enter review'),
});

type FormValues = yup.InferType<typeof schema>;

const Row = ({
    review,
    onReview,
}: {
    review: Review;
    onReview: (reviewId: number) => void;
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { control, handleSubmit } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handelReview = async (data: FormValues) => {
        try {
            setIsLoading(true);
            await reviewService.updateReview(review.reviewId, data);
            onReview(review.reviewId);
            onClose();
            setIsLoading(false);
            toast.success('Add review successfully');
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message || 'Add review failed');
        }
    };

    return (
        <>
            {isLoading && <LoadingFullPage />}
            <StyledTr>
                <StyedCol data-title="Id" component="th" className="id">
                    {review.reviewId}
                </StyedCol>
                <StyedCol
                    data-title="Product Name"
                    component="th"
                    className="name"
                >
                    <Stack direction="row" alignItems="center">
                        <TextLimit
                            numLine={2}
                            title={review.productName}
                            fontWeight={500}
                        >
                            {review.productName}
                        </TextLimit>
                    </Stack>
                </StyedCol>
                <StyedCol data-title="Rating" component="th" className="total">
                    <Rating
                        defaultValue={review.rating}
                        max={5}
                        sx={{
                            fontSize: 15,
                            color: (theme) => theme.themeColor.primary,
                        }}
                        readOnly
                    />
                </StyedCol>
                <StyedCol data-title="Review" component="th" className="review">
                    <Stack
                        direction="row"
                        gap={16}
                        rowGap={4}
                        justifyItems="center"
                        flexWrap="wrap"
                    >
                        <TextLimit
                            numLine={2}
                            title="  Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Sunt quia ex fuga! In harum
                                ipsa nesciunt voluptates placeat nobis earum ad,
                                incidunt voluptatem velit, obcaecati provident
                                explicabo tenetur cum odio."
                        >
                            {review.description || 'N/A'}
                        </TextLimit>
                    </Stack>
                </StyedCol>
                <StyedCol data-title="Action" component="th" className="action">
                    <TextHover
                        sx={{
                            display: 'block',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontWeight: 500,
                        }}
                        onClick={onOpen}
                    >
                        Write review
                    </TextHover>
                </StyedCol>
            </StyledTr>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                <form onSubmit={handleSubmit(handelReview)}>
                    <ModalHeader title="Write review" onClose={onClose} />
                    <ModalBody>
                        <Stack gap={16}>
                            <Typography fontWeight={600}>
                                You&apos;re reviewing: {review.productName}
                            </Typography>
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Stack gap={8}>
                                        <Label required>Ratting</Label>
                                        <Rating {...field} max={5} />
                                        {fieldState.error && (
                                            <MessageError>
                                                {fieldState.error.message}
                                            </MessageError>
                                        )}
                                    </Stack>
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Stack gap={8}>
                                        <Label required>Description</Label>
                                        <Input
                                            {...field}
                                            multiline
                                            rows={5}
                                            placeholder="Description"
                                            sx={{
                                                '.MuiInputBase-input': {
                                                    py: 16,
                                                },
                                            }}
                                            isError={
                                                !!fieldState.error?.message
                                            }
                                        />
                                        {fieldState.error && (
                                            <MessageError>
                                                {fieldState.error.message}
                                            </MessageError>
                                        )}
                                    </Stack>
                                )}
                            />
                        </Stack>
                    </ModalBody>
                    <ModalFooter
                        textCancel="Close"
                        textOk="Add review"
                        onCancel={onClose}
                        btnOkProps={{
                            type: 'submit',
                        }}
                    />
                </form>
            </Dialog>
        </>
    );
};

const StyledOrderTable = styled('table')`
    width: 100%;
    border-radius: ${pxToRem(4)};
`;

const StyledTHead = styled('thead')``;

const StyledTBody = styled('tbody')``;

const StyledTr = styled('tr')``;

const StyedCol = styled(Box)`
    padding: ${pxToRem(10)} ${pxToRem(15)};
    width: auto;
    border: 1px solid ${(p) => p.theme.themeColor.border};
    text-align: start;
    display: block;

    &.head {
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        display: none;
    }

    &.review {
        width: 100%;
    }

    &:not(&.head)::before {
        content: attr(data-title) ': ';
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        margin-right: ${pxToRem(4)};
        display: inline-block;
        margin-bottom: ${pxToRem(4)};
    }

    @media screen and (${DEVICE.laptop}) {
        display: table-cell;
        &.head {
            display: table-cell;
        }

        &:not(&.head)::before {
            display: none;
        }

        &.review {
            width: 30%;
        }
    }
`;

export default ReviewTable;
