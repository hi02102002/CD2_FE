import { Box, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



import { Button, PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

const newSub: NextPageWithLayout = (props: Props) => {
    return (
        <Box component='div' className='main-content'>
            <Typography
                variant="h4"
                sx={{
                    fontSize: 18,
                    fontWeight: 300,
                    marginBottom: 32,
                }}
            >
                Subscription option
            </Typography>
            <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="General Subscription"
            />

            <Button
                sx={{ marginTop: 14 }}
                typeButton="primary"
                className="btn-save"
            >
                Save
            </Button>
        </Box>
    );
};

newSub.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="Newsletter Subscriptions"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.ACCOUNT,
                        name: 'Account',
                    },
                    {
                        href: ROUTES.LOGIN,
                        name: 'Newsletter Subscriptions',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default newSub;