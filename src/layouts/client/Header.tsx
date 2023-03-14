import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
    Box,
    BoxProps,
    IconButton,
    StackProps,
    Typography,
    keyframes,
    styled,
    useTheme,
} from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import {
    IconHeart,
    IconLayoutDashboard,
    IconLogin,
    IconLogout,
    IconMenu2,
    IconSearch,
    IconShoppingCart,
    IconUser,
    IconUserPlus,
} from '@tabler/icons-react';

import { DrawerCart } from '@/components/client';
import { Badge, Menu, MenuItem, Tooltip } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/auth';
import { ROLE } from '@/types/user';
import { pxToRem } from '@/utils/pxToRem';

const Header = () => {
    const theme = useTheme();
    const router = useRouter();
    const { user, setAuth } = useAuthStore();
    const headerRef = useRef<HTMLElement | null>(null);
    const [anchorElMenuUser, setAnchorElMenuUser] =
        useState<null | HTMLElement>(null);
    const handelOpenMenuUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenuUser(event.currentTarget);
    };

    const handleCloseMenuUser = () => {
        setAnchorElMenuUser(null);
    };

    const {
        isOpen: isOpenCart,
        onOpen: onOpenCart,
        onClose: onCloseCart,
    } = useDisclosure();

    const handleNavigate = (route: string) => {
        router.push(route);
        setAnchorElMenuUser(null);
    };

    useEffect(() => {
        const handelScroll = () => {
            if (headerRef.current) {
                if (window.scrollY >= headerRef.current.offsetHeight) {
                    headerRef.current.classList.add('header-fixed');
                } else {
                    headerRef.current.classList.remove('header-fixed');
                }
            }
        };
        window.addEventListener('scroll', handelScroll);

        return () => window.removeEventListener('scroll', handelScroll);
    }, []);

    return (
        <StyledHeader ref={headerRef} component="header">
            <div className="container-app">
                <StyledHeaderWrap
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={8}
                >
                    <Stack direction="row" gap={8} alignItems="center">
                        <IconButton disableTouchRipple className="btn-toggle">
                            <IconMenu2 color={theme.themeColor.primary} />
                        </IconButton>
                        <Link href={ROUTES.HOME}>
                            <StyledLogo>
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    className="img-logo"
                                    fill
                                />
                            </StyledLogo>
                        </Link>
                    </Stack>
                    <StyledToolbar>
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
                            <IconButton disableTouchRipple className="search">
                                <IconSearch color={theme.themeColor.primary} />
                            </IconButton>
                        </Tooltip>
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
                                        onClick={() =>
                                            handleNavigate('/account')
                                        }
                                    >
                                        <IconUser />
                                        <Typography>Account</Typography>
                                    </MenuItem>
                                    {user.roles.includes(ROLE.ADMIN) && (
                                        <MenuItem
                                            disableRipple
                                            onClick={() =>
                                                handleNavigate(ROUTES.ADMIN)
                                            }
                                        >
                                            <IconLayoutDashboard />
                                            <Typography>
                                                Admin Dashboard
                                            </Typography>
                                        </MenuItem>
                                    )}
                                    <MenuItem
                                        disableRipple
                                        onClick={() =>
                                            handleNavigate('/wishlist')
                                        }
                                    >
                                        <IconHeart />
                                        <Typography>Wishlist</Typography>
                                    </MenuItem>

                                    <MenuItem
                                        disableRipple
                                        onClick={() => {
                                            authService.logout();
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
                                        onClick={() =>
                                            handleNavigate(ROUTES.LOGIN)
                                        }
                                    >
                                        <IconLogin />
                                        <Typography>Login</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        disableRipple
                                        onClick={() =>
                                            handleNavigate(ROUTES.REGISTER)
                                        }
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
                            <IconButton
                                disableTouchRipple
                                className="wish-list"
                            >
                                <Badge badgeContent={10}>
                                    <IconHeart
                                        color={theme.themeColor.primary}
                                    />
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
                                    <Badge badgeContent={0}>
                                        <IconShoppingCart
                                            color={theme.themeColor.primary}
                                        />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <StyledDisplayItemsPrice>
                                <Typography className="items">
                                    0 Items
                                </Typography>
                                <Typography variant="body2" className="price">
                                    0.00$
                                </Typography>
                            </StyledDisplayItemsPrice>
                        </Stack>
                    </StyledToolbar>
                </StyledHeaderWrap>
                <DrawerCart isOpen={isOpenCart} onClose={onCloseCart} />
            </div>
        </StyledHeader>
    );
};

const MoveHeader = keyframes`
    0% {
        opacity: 0;
    transform: translate3d(0,-100px,0)
    }
    100%{
        opacity: 1;
        transform: none;
    }
`;

const StyledLogo = styled(Box)<BoxProps>`
    width: ${pxToRem(129)};
    height: ${pxToRem(32.25)};
    position: relative;

    .img-logo {
        object-fit: contain;
    }

    @media screen and (${DEVICE.tablet}) {
        width: ${pxToRem(172)};
        height: ${pxToRem(43)};
    }
`;

const StyledHeader = styled(Box)<BoxProps>`
    display: flex;
    align-items: center;
    height: ${({ theme }) => theme.size.height.header};
    border-bottom: 1px solid ${grey[300]};
    background-color: ${common.white};
    transition: transform 0.5s;

    &.header-fixed {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1000;

        animation: ${MoveHeader} 0.5s;
        box-sizing: 0 8px 20px 0 rgb(0 0 0 / 10%);
    }
`;

const StyledHeaderWrap = styled(Stack)<StackProps>`
    .btn-toggle {
        display: flex;
    }

    @media screen and (${DEVICE.tablet}) {
        gap: ${pxToRem(16)};

        .btn-toggle {
            display: none;
        }
    }
`;

const StyledToolbar = styled(Box)<BoxProps>`
    display: flex;
    align-items: center;
    gap: ${pxToRem(8)};

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

export default Header;
