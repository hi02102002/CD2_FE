import { Box, styled } from '@mui/material';

import { LoginContainer } from '@/components/Login';
import { PageTop, SignInSocial } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
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
                <LoginSocial className="block-content">
                    <SignInSocial social="facebook" />
                    <SignInSocial social="google" />
                </LoginSocial>
                <LoginContainer></LoginContainer>
            </Box>
        </>
    );
};

Login.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
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



export default Login;
