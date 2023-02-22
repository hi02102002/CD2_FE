import {
    IconApps,
    IconArrowBackUp,
    IconBallBasketball,
    IconCheese,
    IconUsers,
} from '@tabler/icons-react';

import { ROUTES } from '@/constants';
import { SidebarItem } from '@/types/shared';

const sidebarItems: Array<SidebarItem> = [
    {
        href: ROUTES.ADMIN,
        name: 'Dashboard',
        Icon: IconApps,
    },
    {
        href: ROUTES.ADMIN_CUSTOMER,
        name: 'Customers',
        Icon: IconUsers,
    },
    {
        href: ROUTES.ADMIN_CATEGORY,
        name: 'Category',
        Icon: IconBallBasketball,
    },
    {
        href: ROUTES.ADMIN_PRODUCT,
        name: 'Products',
        Icon: IconCheese,
    },
    {
        href: ROUTES.HOME,
        name: 'Back to Shopping',
        Icon: IconArrowBackUp,
    },
];

export default sidebarItems;
