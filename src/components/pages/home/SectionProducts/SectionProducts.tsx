import { Box, Typography, styled } from '@mui/material';

import { ProductGrid } from '@/components/client';
import { Button } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

const SectionProducts = () => {
    return (
        <StyledSectionProducts>
            <Box component="div" className="container-app">
                <StyledHeading>
                    <Typography fontSize="inherit" className="title">
                        You are in{' '}
                        <Typography fontSize="inherit" className="main-text">
                            {''} bet sellers
                        </Typography>
                    </Typography>
                </StyledHeading>
                <ProductGrid />
                <Button
                    sx={{
                        margin: '0 auto',
                        marginTop: pxToRem(20),
                    }}
                    typeButton="secondary"
                >
                    See More
                </Button>
            </Box>
        </StyledSectionProducts>
    );
};

const StyledSectionProducts = styled(Box)``;

const StyledHeading = styled(Box)`
    font-size: ${pxToRem(28)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${pxToRem(20)};

    .title {
        display: inline-block;
        text-align: center;
    }

    .main-text {
        color: ${({ theme }) => theme.themeColor.primary};
        display: inline-block;
    }

    @media screen and (${DEVICE.tablet}) {
        font-size: ${pxToRem(36)};
    }

    @media screen and (${DEVICE.laptopM}) {
        font-size: ${pxToRem(48)};
    }
`;

export default SectionProducts;
