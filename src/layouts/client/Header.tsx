import Image from 'next/image';
import Link from 'next/link';

import {
    Box,
    BoxProps,
    IconButton,
    Typography,
    styled,
    useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconHeart, IconSearch, IconShoppingCart } from '@tabler/icons-react';

import { DrawerCart } from '@/components/client';
import { Badge, Tooltip } from '@/components/common';
import { useDisclosure } from '@/components/hooks/useDisclosure';
import { ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Header = (props: Props) => {
    const theme = useTheme();

    const {
        isOpen: isOpenCart,
        onOpen: onOpenCart,
        onClose: onCloseCart,
    } = useDisclosure();

    return (
        <StyledHeader component="header">
            <div className="container-app">
                <StyledHeaderWrap>
                    <Link href={ROUTES.HOME}>
                        <Image
                            src="/logo.png"
                            width={172}
                            height={43}
                            alt="Logo"
                        />
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: pxToRem(16),
                        }}
                    >
                        <Tooltip
                            title="Search"
                            arrow
                            PopperProps={{
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -5],
                                        },
                                    },
                                ],
                            }}
                        >
                            <IconButton disableTouchRipple>
                                <IconSearch color={theme.themeColor.primary} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Wishlist"
                            arrow
                            PopperProps={{
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -5],
                                        },
                                    },
                                ],
                            }}
                        >
                            <IconButton disableTouchRipple>
                                <Badge badgeContent={10}>
                                    <IconHeart
                                        color={theme.themeColor.primary}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                            }}
                        >
                            <Tooltip
                                title="Cart"
                                arrow
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, -5],
                                            },
                                        },
                                    ],
                                }}
                            >
                                <IconButton
                                    disableTouchRipple
                                    onClick={onOpenCart}
                                >
                                    <Badge badgeContent={0}>
                                        <IconShoppingCart
                                            color={theme.themeColor.primary}
                                        />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        lineHeight: 1,
                                    }}
                                >
                                    0 Items
                                </Typography>
                                <Typography
                                    sx={{
                                        lineHeight: 1,
                                        fontWeight: 600,
                                    }}
                                    variant="body2"
                                >
                                    0.00$
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </StyledHeaderWrap>
                <DrawerCart isOpen={isOpenCart} onClose={onCloseCart} />
            </div>
        </StyledHeader>
    );
};

const StyledHeader = styled(Box)<BoxProps>`
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.size.height.header};
    border-bottom: 1px solid ${grey[300]};
`;

const StyledHeaderWrap = styled(Box)<BoxProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${pxToRem(16)};
`;

export default Header;
