import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

import type { Icon } from '@tabler/icons-react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type SidebarItem = {
    href: string;
    name: string;
    Icon: Icon;
};

export type Breadcrumb = {
    href: string;
    name: string;
};
