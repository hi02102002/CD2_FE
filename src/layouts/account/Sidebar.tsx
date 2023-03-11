import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, List, Typography, styled } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { DEVICE } from '@/constants';

type Props = {};

const LIST_ITEM = [
    {
        href: '/account',
        title: 'My Account',
    },
    {
        href: '/account/orders',
        title: 'My Orders',
    },
    {
        href: '/account/dowProducts',
        title: 'My Downloadable Products',
    },
    {
        href: '/account/wishlist',
        title: 'My Wish List',
    },
    {
        href: '/account/addressBook',
        title: 'Address Book',
    },
    {
        href: '/account/accInfor',
        title: 'Account Information',
    },
    {
        href: '/account/storePayMet',
        title: 'Stored Payment Methods',
    },
    {
        href: '/account/productReview',
        title: 'My Product Reviews',
    },
    {
        href: '/account/newSub',
        title: 'Newsletter Subscriptions',
    },
    {
        href: '/account/abc',
        title: 'Logout',
    },
];

const Sidebar = (props: Props) => {
    const router = useRouter();
    const emtyWishlist: boolean = true;

    return (
        <MainSidebar>
            <Box sx={{ minWidth: 276, border: '1px solid #eee', padding: 24 }}>
                <nav>
                    <List className="list-account">
                        {LIST_ITEM.map((item) => {
                            return (
                                <ListItem key={item.href}>
                                    <Link href={item.href}>
                                        <ItemAccount
                                            className={`${
                                                item.href === router.pathname
                                                    ? 'active'
                                                    : ''
                                            }`}
                                        >
                                            {item.title}
                                        </ItemAccount>
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                </nav>
            </Box>
            {emtyWishlist ? (
                <Box sx={{ marginTop: 30 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        My Wish List
                    </Typography>
                    <Typography component="span">
                        You have no items in your wish list.
                    </Typography>
                </Box>
            ) : (
                <></>
            )}
        </MainSidebar>
    );
};

const MainSidebar = styled('div')`
    margin-right: 0;
    @media screen and (${DEVICE.laptopM}) {
        margin-right: 32px;
    }
`;
const ItemAccount = styled(Typography)`
    &.active {
        color: red;
    }
`;
export default Sidebar;
