import Image from 'next/image';

import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import img1 from '@/assets/product_fashion_22_a_4.jpeg';
import img from '@/assets/washing-instruction.png';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import DetailTabItem from '../DetailTabItem';

function DetailTab() {
    return (
        <DescItem component="div">
            <Typography variant="h3" fontWeight="400" marginBottom={15}>
                The Iconic Silhouette
            </Typography>
            <Typography
                variant="body1"
                color="#666"
                lineHeight="1.75"
                marginBottom={35}
            >
                He garments labelled as Committed are products that have been
                produced using sustainable fibers or processes, reducing their
                environmental impact. Mango’s goal is to support the
                implementation of practices more committed to the environment,
                and therefore increase the number of sustainable garments in the
                collection.
            </Typography>
            <StyledBox component="div">
                <DetailTabItem
                    className="product-details-item"
                    title="Information"
                >
                    <ul
                        style={{ listStyleType: 'circle', paddingLeft: '17px' }}
                        className="list-info"
                    >
                        <li>Cutaway collar</li>
                        <li>Front button fastening</li>
                        <li>Chest patch pocket</li>
                        <li>Long sleeves</li>
                    </ul>
                </DetailTabItem>

                <DetailTabItem
                    className="product-details-item"
                    title="Composition"
                >
                    <ul
                        style={{ listStyleType: 'circle', paddingLeft: '17px' }}
                        className="list-info"
                    >
                        <li>Outer: Polyamide 30%</li>
                        <li>Lining: Polyester 70%</li>
                    </ul>
                </DetailTabItem>

                <DetailTabItem
                    className="product-details-item"
                    title="Composition"
                >
                    <Typography variant="body1">
                        Model is 1.84 m wearing size M
                    </Typography>
                </DetailTabItem>

                <DetailTabItem
                    className="product-details-item"
                    title="Washing Instructions"
                >
                    <Image src={img} alt=""></Image>
                    <Typography variant="body1" sx={{ marginTop: '30px' }}>
                        Machine wash, no ironing, don’t dry clean, don’t tumble
                        dry
                    </Typography>
                </DetailTabItem>
            </StyledBox>
            <BottomDetails container spacing={16}>
                <Grid item xs={12} md={6}>
                    <Box component="div" className="bottom-details-img">
                        <Image src={img1} alt="" fill />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="div" className="bottom-details-desc">
                        <Typography variant="caption">
                            Poplin top with ruffle trim
                        </Typography>
                        <Typography variant="body1">
                            We believe in crafting pieces where sustainability
                            and style go hand in hand. Made from materials like
                            recycled cashmere and sust
                        </Typography>
                    </Box>
                </Grid>
            </BottomDetails>
        </DescItem>
    );
}

const DescItem = styled(Box)`
    .list-info {
        li {
            margin-bottom: ${pxToRem(12)};
        }
    }
`;

const BottomDetails = styled(Grid)`
    .bottom-details-img {
        padding-right: ${pxToRem(30)};
        position: relative;
        padding-bottom: ${0.623853211 * 100}%;
    }

    .bottom-details-desc {
        display: flex;
        flex-direction: column;
        justify-content: center;

        span {
            font-size: ${pxToRem(42)};
            color: #000;
        }

        p {
            line-height: 1.75;
        }
    }
`;

const StyledBox = styled(Box)`
    display: flex;
    margin-bottom: ${pxToRem(60)};

    @media ${DEVICE.mobileS} {
        flex-direction: column;
        .product-details-item {
            width: 100%;
        }
    }

    @media ${DEVICE.tablet} {
        flex-direction: row;
    }
`;

export default DetailTab;
