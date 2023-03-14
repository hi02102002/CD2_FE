import { Box, Grid, Slider, Stack, Typography, styled } from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { motion } from 'framer-motion';

import { Button, TextHover, Tooltip } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

// export type FilterProps = {
//     onFilter?: () => void;
// };

const SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

const marks = [
    {
        value: 0,
        label: '0$',
    },

    {
        value: 50,
        label: '50$',
    },
    {
        value: 100,
        label: '100$',
    },
];

const Filter = () => {
    return (
        <StyledFilter container rowSpacing={16} columnSpacing={16}>
            <Grid item xs={12} lg={3}>
                <StyledTitle variant="h4">Category</StyledTitle>
                <StyledListCategory component="ul">
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>

                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                    <Box component="li" className="category-item">
                        <TextHover>Sneaker</TextHover>
                        <span className="amount">(19)</span>
                    </Box>
                </StyledListCategory>
            </Grid>
            <Grid item xs={12} lg={3}>
                <StyledTitle variant="h4">Sizes</StyledTitle>
                <StyledListSize gap={8} direction="row">
                    {SIZES.map((size) => {
                        return (
                            <Tooltip
                                title={size}
                                sx={{
                                    width: 42,
                                    textAlign: 'center',
                                }}
                                placement="top"
                                arrow
                                key={size}
                            >
                                <Button
                                    className="btn-select-size"
                                    typeButton="secondary"
                                >
                                    {size}
                                </Button>
                            </Tooltip>
                        );
                    })}
                </StyledListSize>
            </Grid>
            <Grid item xs={12} lg={3}>
                <StyledTitle variant="h4">Colors</StyledTitle>
                <StyledListColor>
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                    <Box
                        component="div"
                        className="color-item"
                        sx={{
                            backgroundColor: 'ButtonFace',
                        }}
                    />
                </StyledListColor>
            </Grid>
            <Grid item xs={12} lg={3}>
                <StyledTitle variant="h4">Price</StyledTitle>
                <Stack alignItems="center" justifyContent="center">
                    <StyledSlider
                        getAriaValueText={(value) => {
                            return `$${value}`;
                        }}
                        valueLabelDisplay="auto"
                        defaultValue={[20, 37]}
                        marks={marks}
                    />
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

const StyledListSize = styled(Stack)`
    flex-wrap: wrap;

    .btn-select-size {
        width: ${pxToRem(42)};
        height: ${pxToRem(42)};
        padding: 0;
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

const StyledListColor = styled(Stack)`
    align-items: center;
    gap: ${pxToRem(8)};
    flex-direction: row;

    .color-item {
        border-radius: 50%;
        cursor: pointer;
        width: ${pxToRem(32)};
        height: ${pxToRem(32)};
        position: relative;

        &::after {
            content: '';
            border-radius: 50%;
            position: absolute;
            inset: 0;
            transition: all 0.3s ease;
        }

        &:hover::after {
            border: 1px solid ${({ theme }) => theme.themeColor.primary};
        }
    }
`;

export default Filter;
