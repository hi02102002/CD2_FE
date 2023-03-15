import { Grid, GridProps, GridSpacing, styled } from '@mui/material';

import ProductItem from '../ProductItem';

type Props = {
    numCol?: 5 | 4 | 3 | 2;
    spacing?: GridProps['spacing'];
};

const ProductGrid = ({ numCol = 4, spacing }: Props) => {
    return (
        <StyledProductGrid
            container
            spacing={
                typeof spacing === 'number'
                    ? spacing
                    : {
                          xs: 16,
                          md: 30,
                          ...(spacing as { [key: string]: GridSpacing }),
                      }
            }
        >
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
            <Grid item xs={6} md={4} lg={12 / numCol}>
                <ProductItem />
            </Grid>
        </StyledProductGrid>
    );
};

const StyledProductGrid = styled(Grid)``;

export default ProductGrid;
