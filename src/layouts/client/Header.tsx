import { useEffect, useRef } from 'react';



import Image from 'next/image';
import Link from 'next/link';



import { Box, IconButton, keyframes, styled, useTheme } from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { IconMenu2 } from '@tabler/icons-react';



import { HeaderToolbar } from '@/components/client';
import { DEVICE, ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';


const Header = () => {
    const theme = useTheme();
    const headerRef = useRef<HTMLElement | null>(null);

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
                    <HeaderToolbar />
                </StyledHeaderWrap>
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

const StyledLogo = styled(Box)`
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

const StyledHeader = styled(Box)`
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

const StyledHeaderWrap = styled(Stack)`
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

export default Header;