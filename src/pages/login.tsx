import { Box, styled } from '@mui/material';

import { LoginContainer } from '@/components/Login';
import { PageTop, SignInSocial } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Login: NextPageWithLayout<Props> = (props) => {
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
                <LoginP className="block-content">
                    <SignInSocial social="facebook" />
                    <SignInSocial social="google" />
                </LoginP>
                <LoginContainer></LoginContainer>
            </Box>
        </>
    );
};

Login.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

const LoginP = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: ${pxToRem(48)};
`;

const Main = styled('div')`
    max-width: 1200px;
    margin: 40px auto 0px;
`;

export default Login;
