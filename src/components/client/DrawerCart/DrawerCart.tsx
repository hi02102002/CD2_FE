import Image from 'next/image';

import { Box, BoxProps, Drawer, Typography, styled } from '@mui/material';
import { IconX } from '@tabler/icons-react';

import { Button } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    onClose?: () => void;
    isOpen?: boolean;
};

const DrawerCart = ({ isOpen, onClose }: Props) => {
    return (
        <Drawer
            ModalProps={{
                keepMounted: false,
            }}
            PaperProps={{
                sx: {
                    width: 450,
                },
            }}
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <StyledHeader>
                <Typography className="title">Shopping Cart</Typography>
                <Box component="div" className="button-close" onClick={onClose}>
                    <IconX />
                </Box>
            </StyledHeader>
            <StyledBody>
                <Box component="div" className="image-cart">
                    <Image
                        src="/empty-cart.png"
                        alt="Empty cart"
                        width={240}
                        height={210}
                    />
                </Box>
                <Typography
                    sx={{
                        color: (theme) => theme.themeColor.title,
                        fontSize: 18,
                        fontWeight: 600,
                        marginTop: 4,
                        marginBottom: 4,
                    }}
                >
                    Your cart is empty.
                </Typography>
                <Typography>
                    You may check out all the available products and buy some in
                    the shop.
                </Typography>
                <Button className="btn-return" typeButton="primary">
                    Return to shop
                </Button>
            </StyledBody>
        </Drawer>
    );
};

const StyledHeader = styled(Box)<BoxProps>`
    padding: ${pxToRem(24)} ${pxToRem(24)} ${pxToRem(5)} ${pxToRem(24)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
        font-weight: 600;
        font-size: ${pxToRem(24)};
        color: ${({ theme }) => theme.themeColor.title};
    }

    .button-close {
        cursor: pointer;
    }
`;

const StyledBody = styled(Box)<BoxProps>`
    padding: ${pxToRem(10)} ${pxToRem(24)};
    text-align: center;

    .image-cart {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-return {
        margin: 0 auto;
        margin-top: ${pxToRem(16)};
    }
`;

export default DrawerCart;
