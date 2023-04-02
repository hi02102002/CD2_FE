import { useRouter } from 'next/router';

import { Box, Typography, styled } from '@mui/material';

import { ProductGrid } from '@/components/client';
import { Button } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { Product } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    products: Product[];
};

const SectionProducts = ({ products }: Props) => {
    const router = useRouter();

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
                <ProductGrid products={products} />
                <Button
                    sx={{
                        margin: '0 auto',
                        marginTop: pxToRem(20),
                    }}
                    typeButton="secondary"
                    onClick={() => {
                        router.push(ROUTES.PRODUCTS);
                    }}
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
