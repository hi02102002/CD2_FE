import { Box, styled } from '@mui/material';

import { PageTop, SignInSocial } from '@/components/common';
import { LoginContainer } from '@/components/pages/Login';
import { DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import { withProtect } from '@/utils/withProtect';

const Login: NextPageWithLayout = () => {
    return (
        <>
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
            <Box className="container-app">
                <LoginSocial className="block-content">
                    <SignInSocial social="facebook" />
                    <SignInSocial social="google" />
                </LoginSocial>
                <LoginContainer />
            </Box>
        </>
    );
};

const LoginSocial = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: ${pxToRem(48)};

    @media ${DEVICE.mobileS} {
        flex-direction: column;
        align-items: center;
    }

    @media ${DEVICE.tablet} {
        flex-direction: row;
        /* align-items: center; */
    }
`;

Login.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: false,
})();

export default Login;
