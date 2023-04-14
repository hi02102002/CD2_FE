import { useState } from 'react';

import { useRouter } from 'next/router';

import {
    Box,
    BoxProps,
    IconButton,
    Stack,
    Typography,
    styled,
    useTheme,
} from '@mui/material';
import {
    IconHeart,
    IconLayoutDashboard,
    IconLogin,
    IconLogout,
    IconSearch,
    IconShoppingCart,
    IconUser,
    IconUserPlus,
} from '@tabler/icons-react';

import { Badge, Menu, MenuItem, Tooltip } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/auth';
import useCartStore from '@/store/cart';
import { ROLE } from '@/types/user';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';

import DrawerCart from '../DrawerCart';
import Search from '../Search';

type Props = {
    forSearch?: boolean;
};

const HeaderToolbar = ({ forSearch = false }: Props) => {
    const router = useRouter();
    const theme = useTheme();
    const [anchorElMenuUser, setAnchorElMenuUser] =
        useState<null | HTMLElement>(null);
    const { user, setAuth } = useAuthStore();

    const {
        isOpen: isOpenCart,
        onOpen: onOpenCart,
        onClose: onCloseCart,
    } = useDisclosure();

    const {
        isOpen: isOpenSearch,
        onClose: onCloseSearch,
        onOpen: onOpenSearch,
    } = useDisclosure();

    const handleNavigate = (route: string) => {
        router.push(route);
        setAnchorElMenuUser(null);
    };

    const handelOpenMenuUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenuUser(event.currentTarget);
    };

    const handleCloseMenuUser = () => {
        setAnchorElMenuUser(null);
    };

    const { totalQuantity, totalPrice } = useCartStore();

    return (
        <>
            <StyledToolbar>
                {!forSearch && (
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
                        <IconButton
                            disableTouchRipple
                            className="search"
                            onClick={onOpenSearch}
                        >
                            <IconSearch color={theme.themeColor.primary} />
                        </IconButton>
                    </Tooltip>
                )}
                <IconButton
                    disableTouchRipple
                    className="user"
                    onClick={handelOpenMenuUser}
                >
                    <IconUser color={theme.themeColor.primary} />
                </IconButton>
                <Menu
                    anchorEl={anchorElMenuUser}
                    open={Boolean(anchorElMenuUser)}
                    onClose={handleCloseMenuUser}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom',
                    }}
                    transformOrigin={{
                        horizontal: 'center',
                        vertical: 'top',
                    }}
                    PaperProps={{
                        sx: {
                            width: 200,
                        },
                    }}
                >
                    {user ? (
                        <>
                            <MenuItem
                                disableRipple
                                onClick={() => handleNavigate('/account')}
                            >
                                <IconUser />
                                <Typography>Account</Typography>
                            </MenuItem>
                            {user.roles.includes(ROLE.ADMIN) && (
                                <MenuItem
                                    disableRipple
                                    onClick={() => handleNavigate(ROUTES.ADMIN)}
                                >
                                    <IconLayoutDashboard />
                                    <Typography>Admin Dashboard</Typography>
                                </MenuItem>
                            )}
                            <MenuItem
                                disableRipple
                                onClick={() => handleNavigate('/wishlist')}
                            >
                                <IconHeart />
                                <Typography>Wishlist</Typography>
                            </MenuItem>
                            <MenuItem
                                disableRipple
                                onClick={async () => {
                                    await authService.logout();
                                    setAuth({
                                        accessToken: null,
                                        user: null,
                                    });
                                }}
                            >
                                <IconLogout />
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                disableRipple
                                onClick={() => handleNavigate(ROUTES.LOGIN)}
                            >
                                <IconLogin />
                                <Typography>Login</Typography>
                            </MenuItem>
                            <MenuItem
                                disableRipple
                                onClick={() => handleNavigate(ROUTES.REGISTER)}
                            >
                                <IconUserPlus />
                                <Typography>Register</Typography>
                            </MenuItem>
                        </>
                    )}
                </Menu>
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
                    <IconButton disableTouchRipple className="wish-list">
                        <Badge badgeContent={10}>
                            <IconHeart color={theme.themeColor.primary} />
                        </Badge>
                    </IconButton>
                </Tooltip>
                <Stack direction="row" alignItems="center" gap={16}>
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
                            className="cart"
                        >
                            <Badge badgeContent={totalQuantity || 0}>
                                <IconShoppingCart
                                    color={theme.themeColor.primary}
                                />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <StyledDisplayItemsPrice>
                        <Typography className="items">
                            {totalQuantity} Items
                        </Typography>
                        <Typography variant="body2" className="price">
                            {formatCurrency(totalPrice)}
                        </Typography>
                    </StyledDisplayItemsPrice>
                </Stack>
            </StyledToolbar>
            <DrawerCart isOpen={isOpenCart} onClose={onCloseCart} />
            <Search onClose={onCloseSearch} open={isOpenSearch} />
        </>
    );
};

export default HeaderToolbar;

const StyledToolbar = styled(Box)<BoxProps>`
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};
    flex-shrink: 0;

    .wish-list {
        display: none;
    }

    @media screen and (${DEVICE.tablet}) {
        gap: ${pxToRem(16)};

        .wish-list {
            display: flex;
        }
    }
`;

const StyledDisplayItemsPrice = styled(Box)<BoxProps>`
    display: none;
    flex-direction: column;
    gap: ${pxToRem(1)};
    user-select: none;

    .items {
        font-size: ${pxToRem(14)};
    }

    .price {
        font-weight: 500;
    }

    @media screen and (${DEVICE.tablet}) {
        display: flex;
    }
`;
