import { Box, Stack, Typography } from '@mui/material';

import { PageTop, TextLink } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import useAuthStore from '@/store/auth';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const Account: NextPageWithLayout = () => {
    const { user } = useAuthStore();
    console.log(user);

    return (
        <Box width="100%">
            <Stack p={16} gap={16} border="1px solid #eee">
                <Typography variant="h3">Account Information</Typography>
                <Stack gap={16}>
                    <Stack direction="row" alignItems="end" gap={4}>
                        <Typography variant="h4">Full name: </Typography>
                        <Typography>{user?.fullName}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="end" gap={4}>
                        <Typography variant="h4">Email: </Typography>
                        <Typography>{user?.email}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="end" gap={4}>
                        <Typography variant="h4">Phone number: </Typography>
                        <Typography>{user?.phoneNumber || 'N/A'}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="end" gap={4}>
                        <Typography variant="h4">Birthday: </Typography>
                        <Typography>{user?.dateOfBirth || 'N/A'}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="end" gap={4}>
                        <Typography variant="h4">Sex: </Typography>
                        <Typography>{user?.sex || 'N/A'}</Typography>
                    </Stack>
                    <Stack direction="row" gap={16}>
                        <TextLink href="/account/change-info">
                            Change information
                        </TextLink>
                        <TextLink href="/account/change-password">
                            Change password
                        </TextLink>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};

Account.getLayout = (page) => {
    return (
        <ClientLayout title="My Account" description="My Account">
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

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})();

export default Account;
