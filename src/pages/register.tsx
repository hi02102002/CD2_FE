// type Props = {};
// const Register = (props: Props) => {
//     return <div>Register</div>;
// };
// export default Register;
import { Box, styled } from '@mui/material';

import { PageTop, SignInSocial } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import RegisterContainer from '@/components/register/RegisterContainer';

type Props = {};

const Login: NextPageWithLayout<Props> = (props) => {
    return (
        <>
            <PageTop
                title="Create New Customer Account"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.REGISTER,
                        name: 'Register',
                    },
                ]}
            />
            <Box className="container-app">
                <LoginSocial className="block-content">
                    <SignInSocial social="facebook" />
                    <SignInSocial social="google" />
                </LoginSocial>
                <RegisterContainer></RegisterContainer>
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
