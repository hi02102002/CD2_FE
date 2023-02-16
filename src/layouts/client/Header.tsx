import Image from 'next/image';
import Link from 'next/link';

import {
    Badge,
    Box,
    BoxProps,
    IconButton,
    Tooltip,
    styled,
    useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { IconHeart, IconSearch, IconShoppingCart } from '@tabler/icons-react';

import { ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

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

const Header = (props: Props) => {
    const theme = useTheme();
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
                                <Badge badgeContent={0}>
                                    <IconHeart
                                        color={theme.themeColor.primary}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
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
                            <IconButton disableTouchRipple>
                                <Badge badgeContent={0}>
                                    <IconShoppingCart
                                        color={theme.themeColor.primary}
                                    />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </StyledHeaderWrap>
            </div>
        </StyledHeader>
    );
};

export default Header;
