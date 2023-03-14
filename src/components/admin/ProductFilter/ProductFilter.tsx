import React from 'react';

import {
    Box,
    BoxProps,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Link,
    Slider,
    Typography,
    styled,
} from '@mui/material';
import { common } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

const ProductFilter = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    return (
        <StyledProductFilter>
            <StyledHeader>
                <Typography className="title">Filter</Typography>
                <Link
                    sx={{
                        cursor: 'pointer',
                    }}
                >
                    Clear All
                </Link>
            </StyledHeader>
            <Divider />
            <Box sx={{ padding: 16 }}>
                <Box component="div">
                    <Typography sx={{ mb: 8 }} className="title">
                        Categories
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Men"
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Women"
                        />
                        <FormControlLabel control={<Checkbox />} label="Kids" />
                    </FormGroup>
                </Box>
                <Box component="div">
                    <Typography sx={{ mb: 8 }} className="title">
                        Price
                    </Typography>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>

                <Box>
                    <Typography sx={{ mb: 8 }} className="title">
                        Sizes
                    </Typography>
                    <FormGroup
                        sx={{
                            flexDirection: 'row',
                            gap: 8,
                        }}
                    >
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="S"
                        />
                        <FormControlLabel control={<Checkbox />} label="M" />
                        <FormControlLabel control={<Checkbox />} label="L" />
                        <FormControlLabel control={<Checkbox />} label="XL" />
                        <FormControlLabel control={<Checkbox />} label="2XL" />
                        <FormControlLabel control={<Checkbox />} label="3XL" />
                    </FormGroup>
                </Box>
            </Box>
        </StyledProductFilter>
    );
};

const StyledProductFilter = styled(Box)<BoxProps>`
    background-color: ${common.white};
    height: 100%;
    border-radius: 4px;

    .title {
        font-weight: 600;
    }
`;

const StyledHeader = styled(Box)<BoxProps>`
    height: ${pxToRem(56)};
    padding: 0 ${pxToRem(16)};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default ProductFilter;
