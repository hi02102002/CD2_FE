import Link from 'next/link';

import { Box, Stack, Typography, styled } from '@mui/material';

import { PageTop } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type ItemAccountProps = {
    className?: string;
    header: string;
    sub: string;
    email?: string;
    link: string;
    titleLink: string;
};

const ItemAccount = ({
    className = '',
    header,
    sub,
    email,
    link,
    titleLink,
}: ItemAccountProps) => {
    return (
        <Box
            className={className}
            sx={{
                '& > *': { padding: `6px 0` },
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontSize: 18,
                    fontWeight: 300,
                }}
            >
                {header}
            </Typography>
            <Typography
                component="span"
                sx={{
                    fontSize: 16,
                }}
            >
                {sub}
            </Typography>
            {email ? (
                <Typography
                    component="span"
                    sx={{
                        fontSize: 16,
                    }}
                >
                    {email}
                </Typography>
            ) : (
                <></>
            )}
            <Link href={link}>
                <Typography
                    component="span"
                    sx={{
                        fontSize: 16,
                        opacity: 0.7,
                    }}
                >
                    {titleLink}
                </Typography>
            </Link>
        </Box>
    );
};

const Account: NextPageWithLayout = () => {
    return (
        <Box>
            <AccountInfor>
                <Typography variant="h3" fontSize={26} marginY={20}>
                    Account Information
                </Typography>
                <ContainInfor>
                    <ItemAccount
                        header=" Contact Information"
                        sub="Group Two"
                        email="grouptwo@gmail.com"
                        link="/account/accInfor"
                        titleLink="Edit Change Password"
                    />
                    <ItemAccount
                        className="newLetter"
                        header=" Newsletters"
                        sub="You are subscribed to 'General Subscription'."
                        link="/account/newSub"
                        titleLink="Edit"
                    />
                </ContainInfor>
            </AccountInfor>
            <AddressBook>
                <Stack marginY={20} direction="row" alignItems="center">
                    <Typography variant="h3" fontSize={26} fontWeight={300}>
                        Address Book
                    </Typography>
                    <Link href="/account/addressBook">
                        <Typography
                            sx={{ opacity: 0.7 }}
                            fontSize={16}
                            marginX={20}
                        >
                            Edit Address
                        </Typography>
                    </Link>
                </Stack>
                <ContainAddress>
                    <ItemAccount
                        header=" Default Billing Address"
                        sub="You have not set a default billing address."
                        link="/account/addressBook"
                        titleLink="Edit Address"
                    />
                    <ItemAccount
                        className="shippingAddress"
                        header=" Default Billing Address"
                        sub="You have not set a default billing address."
                        link="/account/addressBook"
                        titleLink="Edit Address"
                    />
                </ContainAddress>
            </AddressBook>
        </Box>
    );
};

Account.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Account"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.ACCOUNT,
                        name: 'Account',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

const AccountInfor = styled(Box)`
    padding: 30px;
    border: 1px solid #eee;
`;

const ContainInfor = styled(Box)`
    display: flex;
    flex-direction: column;
    @media screen and (${DEVICE.tablet}) {
        flex-direction: row;
        justify-content: space-between;
    }
    .newLetter {
        display: flex;
        flex-direction: column;
        margin: 16px 0;
        @media screen and (${DEVICE.tablet}) {
            margin: 0;
        }
    }
`;

const AddressBook = styled(Box)`
    margin: 16px 0 16px 0;
    padding: 30px;
    border: 1px solid #eee;

    @media screen and (${DEVICE.laptopM}) {
        margin: 32px 0 0 0;
    }
`;

const ContainAddress = styled(Box)`
    display: flex;
    flex-direction: column;
    @media screen and (${DEVICE.tablet}) {
        flex-direction: row;
        justify-content: space-between;
    }
    .shippingAddress {
        display: flex;
        flex-direction: column;
        margin: 16px 0;
        @media screen and (${DEVICE.tablet}) {
            margin: 0;
        }
    }
`;

export default Account;
