import Image from 'next/image';

import { Box, Typography, styled } from '@mui/material';

import { DEVICE } from '@/constants';

type ItemWishProps = {
    avatar: any;
    name: string;
    cost: string;
};

const ItemWishList = ({ avatar, name, cost }: ItemWishProps) => {
    return (
        <StyledItemWish>
            <BoxImg>
                <Image
                    className="img-product"
                    src={avatar}
                    alt="Product item"
                    fill
                />
            </BoxImg>
            <Box>
                <Typography
                    variant="h4"
                    sx={{ fontSize: 14, fontWeight: 600, padding: '8px 0' }}
                >
                    {name}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600 }}>
                    ${cost}
                </Typography>
            </Box>
        </StyledItemWish>
    );
};

const StyledItemWish = styled(Box)`
    padding: 0 15px;
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    @media screen and (${DEVICE.tablet}) {
        flex-direction: column;
    }
`;

const BoxImg = styled('div')`
    position: relative;
    height: 110px;
    width: 88px;
    padding-top: 0;
    margin-right: 30px;
    @media screen and (${DEVICE.tablet}) {
        padding-top: ${1.30888030888 * 100}%;
        height: auto;
        width: auto;
        margin-right: 0;
    }
    .img-product {
        object-fit: cover;
    }
`;

export default ItemWishList;
