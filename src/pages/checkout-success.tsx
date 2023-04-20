import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Stack, Typography } from '@mui/material';
import { getCookies, setCookie } from 'cookies-next';

import { Button } from '@/components/common';
import { ROUTES } from '@/constants';
import MainLayout from '@/layouts/client/MainLayout';
import useCheckoutStore from '@/store/checkout';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';

const CheckoutSuccess: NextPageWithLayout = () => {
    const { setIsSuccessful } = useCheckoutStore();
    const router = useRouter();
    useEffect(() => {
        return () => {
            setIsSuccessful(false);
            setCookie('order_success', false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack className="container-app" textAlign="center" alignItems="center">
            <Typography variant="h1" component="h1" my={32} textAlign="center">
                Thank you for your purchase!
            </Typography>
            <Typography mb={18}>
                Your order # is: {router.query.orderId}.
            </Typography>
            <Typography mb={18}>
                We will send you an email with your order details.
            </Typography>
            <Button
                onClick={() => {
                    router.push(ROUTES.PRODUCTS);
                }}
            >
                Continue Shopping
            </Button>
        </Stack>
    );
};

CheckoutSuccess.getLayout = (page) => (
    <MainLayout title="Checkout Success" description="Checkout Success">
        {page}
    </MainLayout>
);

export const getServerSideProps = withProtect({
    isAdmin: false,
    isProtect: true,
})(async (ctx) => {
    const { order_success } = getCookies({
        req: ctx.req,
        res: ctx.res,
    });

    if (order_success === 'false') {
        return {
            redirect: {
                destination: ROUTES.CART,
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
});

export default CheckoutSuccess;
