import { useState } from 'react';

import { Box, Grid, Slider, Stack, Typography, styled } from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { motion } from 'framer-motion';

import { Button, TextHover } from '@/components/common';
import { DEVICE } from '@/constants';
import { Category } from '@/types/category';
import { pxToRem } from '@/utils/pxToRem';

import { useFilter } from '../FilterContext';

const marks = [
    {
        value: 0,
        label: '0$',
    },

    {
        value: 500,
        label: '5000$',
    },
    {
        value: 1000,
        label: '99999$',
    },
];

type Props = {
    categories: Category[];
};

const Filter = ({ categories }: Props) => {
    const { handelFilter, options } = useFilter();
    const [price, setPrice] = useState<number[]>([
        options.minPrice || 0,
        options.maxPrice || 100,
    ]);

    return (
        <StyledFilter container rowSpacing={16} columnSpacing={16}>
            <Grid item xs={12} lg={6}>
                <StyledTitle variant="h4">Category</StyledTitle>
                <StyledListCategory component="ul">
                    {categories.map((category) => {
                        return (
                            <Box
                                component="li"
                                className="category-item"
                                key={category.id}
                                onClick={() => {
                                    handelFilter({
                                        categoryIds: category.id,
                                        offset: 1,
                                    });
                                }}
                            >
                                <TextHover
                                    fontWeight={
                                        category.id === options.categoryIds
                                            ? 600
                                            : undefined
                                    }
                                >
                                    {category.name}
                                </TextHover>
                            </Box>
                        );
                    })}
                </StyledListCategory>
            </Grid>
            <Grid item xs={12} lg={6}>
                <StyledTitle variant="h4">Price</StyledTitle>
                <Stack alignItems="center" justifyContent="center">
                    <StyledSlider
                        getAriaValueText={(value) => {
                            return `$${value}`;
                        }}
                        valueLabelDisplay="auto"
                        defaultValue={[
                            options.minPrice || 0,
                            options.maxPrice || 99999,
                        ]}
                        value={price}
                        marks={marks}
                        onChange={(e, value) => {
                            setPrice(value as number[]);
                        }}
                        min={0}
                        max={1000}
                    />
                    <Button
                        sx={{
                            py: 0,
                            transform: 'none !important',
                            height: 34,
                            mt: 16,
                        }}
                        onClick={() => {
                            handelFilter({
                                minPrice: price[0],
                                maxPrice: price[1],
                            });
                        }}
                    >
                        Filter price
                    </Button>
                </Stack>
            </Grid>
        </StyledFilter>
    );
};

const StyledFilter = styled(motion(Grid))`
    margin-top: 0;

    @media screen and (${DEVICE.laptop}) {
        max-height: ${pxToRem(240)};
        min-height: ${pxToRem(240)};
    }
`;

const StyledTitle = styled(Typography)`
    margin-bottom: ${pxToRem(16)};
`;

const StyledListCategory = styled(Box)`
    max-height: ${pxToRem(160)};
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(4)};

    .category-item {
        display: flex;
        align-items: center;
        gap: ${pxToRem(4)};
        cursor: pointer;
    }

    .category-item .amount {
        font-size: ${pxToRem(14)};
    }

    &::-webkit-scrollbar {
        width: ${pxToRem(5)};
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: ${grey[100]};
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: ${grey[400]};
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: ${grey[500]};
    }
`;

const StyledSlider = styled(Slider)(({ theme }) => ({
    color: theme.themeColor.primary,
    height: 3,
    width: '90%',

    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: common.white,
        border: `2px solid ${common.black}`,

        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },

    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        backgroundColor: theme.themeColor.primary,
    },
}));

export default Filter;
