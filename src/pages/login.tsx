import { PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

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
            <div>Login</div>
        </>
    );
};

Login.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

export default Login;
