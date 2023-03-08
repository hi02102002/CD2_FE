import { useState } from 'react';

import {
    Avatar,
    Box,
    BoxProps,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    styled,
    useMediaQuery,
} from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { IconLogout, IconMenu2, IconSettings } from '@tabler/icons-react';

import { Button } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    onToggleSidebar: () => void;
    isOpenSidebar: boolean;
    isMobile?: boolean;
};

const Header = ({ onToggleSidebar, isOpenSidebar }: Props) => {
    const isMobile = useMediaQuery('(max-width:767px)');
    const [anchorElMenuSetting, setAnchorElMenuSetting] =
        useState<null | HTMLElement>(null);

    const isOpenMenuSetting = Boolean(anchorElMenuSetting);

    const handelOpenMenuSetting = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMenuSetting(event.currentTarget);
    };

    const handleCloseMenuSetting = () => {
        setAnchorElMenuSetting(null);
    };

    return (
        <StyledHeader
            component="header"
            isOpenSidebar={isOpenSidebar}
            isMobile={isMobile}
        >
            <Button
                onClick={onToggleSidebar}
                typeButton="primary"
                className="button-toggle-sidebar"
            >
                <IconMenu2 />
            </Button>
            <Box marginLeft="auto">
                <Stack
                    sx={{
                        cursor: 'pointer',
                    }}
                    alignItems="center"
                    onClick={handelOpenMenuSetting}
                    component="div"
                    gap={8}
                    direction="row"
                >
                    <Tooltip title="Setting">
                        <IconButton size="small">
                            <Avatar sx={{ width: 32, height: 32 }} />
                        </IconButton>
                    </Tooltip>
                    <Typography
                        sx={{
                            fontWeight: 500,
                        }}
                    >
                        Admin
                    </Typography>
                </Stack>
                <Menu
                    open={isOpenMenuSetting}
                    onClose={handleCloseMenuSetting}
                    anchorEl={anchorElMenuSetting}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            width: 270,
                            overflow: 'visible',
                            boxShadow:
                                ' 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                            mt: 7,
                            '& .MuiAvatar-root': {
                                width: 24,
                                height: 24,
                                mr: 1,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem
                        onClick={handleCloseMenuSetting}
                        disableTouchRipple
                    >
                        <ListItemIcon>
                            <Avatar sx={{ width: 32, height: 32 }} />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseMenuSetting}
                        disableTouchRipple
                    >
                        <ListItemIcon>
                            <IconSettings />
                        </ListItemIcon>
                        Setting
                    </MenuItem>
                    <MenuItem
                        onClick={handleCloseMenuSetting}
                        disableTouchRipple
                    >
                        <ListItemIcon>
                            <IconLogout />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        </StyledHeader>
    );
};

const StyledHeader = styled(Box)<BoxProps & Omit<Props, 'onToggleSidebar'>>`
    height: ${({ theme }) => theme.size.height.header};
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    transition: left 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${pxToRem(16)};
    border-bottom: 2px solid ${grey[300]};
    background-color: ${common.white};

    @media ${DEVICE.tablet} {
        left: ${({ theme }) => theme.size.width.sidebar};
    }

    .button-toggle-sidebar {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: 4px;
        height: ${pxToRem(32)};
        min-width: ${pxToRem(32)};

        @media ${DEVICE.tablet} {
            display: none;
        }
    }
`;

export default Header;
