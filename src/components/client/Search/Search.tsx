import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Drawer, Stack, styled } from '@mui/material';
import { common } from '@mui/material/colors';

import { Button, Input } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import HeaderToolbar from '../HeaderToolbar';

type Props = {
    onClose?: () => void;
    open?: boolean;
};

const Search = ({ onClose, open }: Props) => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');

    const handelSearch = () => {
        router.push({
            pathname: ROUTES.PRODUCTS,
            query: {
                name: searchText,
            },
        });
        setSearchText('');
        onClose?.();
    };

    return (
        <Drawer anchor="top" open={open} onClose={onClose}>
            <StyledSearch>
                <Stack
                    direction="row"
                    gap={14}
                    justifyContent="space-between"
                    alignItems="center"
                    className="container-app"
                >
                    <Link href={ROUTES.HOME} className="logo">
                        <StyledLogo>
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                className="img-logo"
                                fill
                            />
                        </StyledLogo>
                    </Link>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        gap={16}
                        className="search"
                    >
                        <Input
                            placeholder="Search product"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                            value={searchText}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handelSearch();
                                }
                            }}
                        />
                        <Button
                            sx={{
                                height: 40,
                                p: 0,
                                px: 16,
                                transform: 'none !important',
                            }}
                            onClick={handelSearch}
                            disabled={searchText.length === 0}
                        >
                            Search
                        </Button>
                    </Stack>
                    <Box component="div" className="toolbar">
                        <HeaderToolbar forSearch />
                    </Box>
                </Stack>
            </StyledSearch>
        </Drawer>
    );
};

export default Search;

const StyledSearch = styled(Box)`
    background-color: ${common.white};
    height: ${({ theme }) => theme.size.height.header};
    display: flex;
    align-items: center;
    user-select: none;

    .toolbar,
    .logo {
        display: none;
    }

    .search {
        width: 100%;
    }

    @media screen and (${DEVICE.tablet}) {
        .toolbar,
        .logo {
            display: block;
        }

        .search {
            width: 60%;
        }
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
