import { Box, styled } from '@mui/material';

import { PageTop } from '@/components/common';
import RegisterContainer from '@/components/pages/register/RegisterContainer';
import { DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';
import { withProtect } from '@/utils/withProtect';

type Props = {};

const Register: NextPageWithLayout<Props> = () => {
    return (
        <>
            <PageTop
                title="Register"
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
                <RegisterContainer />
            </Box>
        </>
    );
};

Register.getLayout = (page) => {
    return (
        <ClientLayout title="Register" description="Register to your account">
            {page}
        </ClientLayout>
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

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: false,
})();

export default Register;
