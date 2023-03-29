import { useRouter } from 'next/router';

import { Box, List, ListItem, Typography, styled } from '@mui/material';

import img from '@/assets/h1_slide_01.jpg';
import { TextLink } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

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

const ListWishList = [
    {
        name: 'Square Shoulder Bag',
        picture: '/src/assets/h1_slide_01.jpg',
        cost: '6.00',
    },
    {
        name: 'Square Shoulder Bag',
        picture: { img },
        cost: '6.00',
    },
    {
        name: 'Square Shoulder Bag',
        picture: { img },
        cost: '6.00',
    },
];

const Sidebar = (props: Props) => {
    const router = useRouter();
    const emtyWishlist = true;

    return (
        <MainSidebar>
            <StyledSideBarWrapper>
                <nav>
                    <List className="list-account">
                        {LIST_ITEM.map((item) => {
                            return (
                                <ListItem key={item.href}>
                                    <ItemAccount
                                        className={`${
                                            item.href === router.pathname
                                                ? 'active'
                                                : ''
                                        }`}
                                        href={item.href}
                                    >
                                        {item.title}
                                    </ItemAccount>
                                </ListItem>
                            );
                        })}
                    </List>
                </nav>
            </StyledSideBarWrapper>
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
    min-width: ${pxToRem(272)};
`;

const StyledSideBarWrapper = styled(Box)`
    padding: 0;
    border: 1px solid ${(p) => p.theme.themeColor.border};

    @media screen and (${DEVICE.tablet}) {
        padding: ${pxToRem(24)};
    }
`;

const ItemAccount = styled(TextLink)`
    &.active {
        color: red;
        font-weight: 500;
    }
`;
export default Sidebar;
