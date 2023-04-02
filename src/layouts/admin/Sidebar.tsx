import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

import {
    Backdrop,
    Box,
    BoxProps,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    styled,
    useMediaQuery,
} from '@mui/material';
import { common, grey } from '@mui/material/colors';

import { DEVICE, ROUTES } from '@/constants';
import sidebarItems from '@/constants/sidebar';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
    const isMobile = useMediaQuery('(max-width:767px)');
    const router = useRouter();
    return (
        <>
            <Backdrop
                open={isOpen}
                sx={{
                    zIndex: 100,
                }}
                onClick={onClose}
            />
            <StyledSidebar component="aside" isOpen={isOpen}>
                <StyledLogo>
                    <Link href={ROUTES.ADMIN} className="admin-logo">
                        <Typography>Admin</Typography>
                    </Link>
                </StyledLogo>
                <List>
                    {sidebarItems.map((item) => {
                        return (
                            <StyledLink key={item.href} href={item.href}>
                                <ListItem
                                    disablePadding
                                    onClick={isMobile ? onClose : undefined}
                                >
                                    <ListItemButton
                                        sx={{
                                            padding: `${pxToRem(4)} ${pxToRem(
                                                8,
                                            )} `,
                                            backgroundColor:
                                                router.pathname === item.href
                                                    ? 'rgba(0, 0, 0, 0.04)'
                                                    : undefined,
                                        }}
                                        disableTouchRipple
                                    >
                                        <ListItemIcon>
                                            <item.Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            </StyledLink>
                        );
                    })}
                </List>
            </StyledSidebar>
        </>
    );
};

const StyledSidebar = styled(Box)<BoxProps & Pick<Props, 'isOpen'>>`
    min-height: 100vh;
    width: ${({ theme }) => theme.size.width.sidebar};
    border-right: 2px solid ${grey[200]};
    position: fixed;
    top: 0;
    bottom: 0;
    transition: left 0.3s ease;
    z-index: 100;
    background-color: ${common.white};
    left: -100%;

    @media ${DEVICE.tablet} {
        left: 0;
    }

    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

const StyledLogo = styled(Box)<BoxProps>`
    height: ${({ theme }) => theme.size.height.header};
    display: flex;
    align-items: center;
    justify-content: center;

    & .admin-logo {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .MuiTypography-root {
        font-size: ${pxToRem(32)};
        font-weight: 800;
    }
`;

const StyledLink = styled(Link)<LinkProps>`
    text-decoration: none;
    color: inherit;
`;

export default Sidebar;
