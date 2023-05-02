import { Box } from '@mui/material';

import { PageTop } from '@/components/common';
import { LoginContainer } from '@/components/pages/Login';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const Login: NextPageWithLayout = () => {
    return (
        <>
            <Box className="container-app">
                <LoginContainer />
            </Box>
        </>
    );
};

Login.getLayout = (page) => {
    return (
        <ClientLayout title="Login" description="Login to your account">
            <PageTop
                title="Login"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.LOGIN,
                        name: 'Login',
                    },
                ]}
            />
            {page}
        </ClientLayout>
    );
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: false,
})();

export default Login;
