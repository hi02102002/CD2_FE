import { useRouter } from 'next/router';

import { Box, List, ListItem, styled } from '@mui/material';

import { TextLink } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

const LIST_ITEM = [
    {
        href: ROUTES.ACCOUNT,
        title: 'My Account',
    },
    {
        href: ROUTES.ACCOUNT_ORDER,
        title: 'My Orders',
    },
    {
        href: ROUTES.ACCOUNT_ADDRESS,
        title: 'Address',
    },
    {
        href: ROUTES.ACCOUNT_CHANGE_INFO,
        title: 'Update Information',
    },
    {
        href: ROUTES.CHANGE_PASS,
        title: 'Change Password',
    },
    {
        href: ROUTES.ACCOUNT_PRODUCT_REVIEW,
        title: 'My Product Reviews',
    },
];

const Sidebar = () => {
    const router = useRouter();

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
        </MainSidebar>
    );
};

const MainSidebar = styled('div')`
    min-width: ${pxToRem(272)};
`;

const StyledSideBarWrapper = styled(Box)`
    padding: 0;
    border: 1px solid ${(p) => p.theme.themeColor.border};
    border-radius: 4px;

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
