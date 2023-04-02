import { Grid, GridProps, GridSpacing, styled } from '@mui/material';



import { Product } from '@/types/product';



import ProductItem from '../ProductItem';

type Props = {
    numCol?: 5 | 4 | 3 | 2;
    spacing?: GridProps['spacing'];
    products: Product[];
};

const ProductGrid = ({ numCol = 4, spacing, products }: Props) => {
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
            {products.map((product) => (
                <Grid item xs={6} md={4} lg={12 / numCol} key={product.id}>
                    <ProductItem product={product} />
                </Grid>
            ))}
        </StyledProductGrid>
    );
};

const StyledProductGrid = styled(Grid)``;

export default ProductGrid;