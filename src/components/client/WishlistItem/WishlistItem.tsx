import Image from 'next/image';

import { Box, Typography, styled } from '@mui/material';

import { TextLink } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type ItemWishProps = {
    avatar: any;
    name: string;
    cost: string;
};

const WishlistItem = ({ avatar, name, cost }: ItemWishProps) => {
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
                <StyledTextLink href={`${ROUTES.PRODUCTS}/${name}`}>
                    {name}
                </StyledTextLink>
                <Typography fontSize={14} fontWeight={600}>
                    ${cost}
                </Typography>
            </Box>
        </StyledItemWish>
    );
};

const StyledItemWish = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: ${pxToRem(16)};
    @media screen and (${DEVICE.tablet}) {
        flex-direction: column;
    }
`;

const BoxImg = styled('div')`
    position: relative;
    height: ${pxToRem(110)};
    width: ${pxToRem(88)};
    padding-top: 0;
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

const StyledTextLink = styled(TextLink)`
    font-size: ${pxToRem(18)};
    padding: ${pxToRem(8)} 0;
`;

export default WishlistItem;
