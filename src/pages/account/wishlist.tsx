import Image from 'next/image';

import { Alert, Box, Grid, Typography, styled } from '@mui/material';

import ItemWishList from '@/components/client/ItemWishList';
import { Button } from '@/components/common';
import { PageTop } from '@/components/common';
import { DEVICE } from '@/constants';
import { ROUTES } from '@/constants';
import AccountLayout from '@/layouts/account';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';

type Props = {};

type ItemWishProps = {
    avatar: any;
    name: string;
    cost: string;
};

const Wishlist: NextPageWithLayout = (props: Props) => {
    const ArrayWishList: ItemWishProps[] = [
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/17ee04dfcbcbea0032b22e4d0a0ac895/p/r/product_fashion_16_a_1.jpeg',
            name: 'Square Shoulder Bag',
            cost: '55.000',
        },
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_30_b_2.jpeg',
            name: 'Quilted Shopper',
            cost: '6.000',
        },
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_03_3.jpg',
            name: 'Check Bag',
            cost: '15.000',
        },
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_30_b_2.jpeg',
            name: 'Quilted Shopper',
            cost: '6.000',
        },
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/03457e065bff3e97e5626ac3824c5d10/p/r/product_fashion_03_3.jpg',
            name: 'Check Bag',
            cost: '15.000',
        },
        {
            avatar: 'https://blueskytechmage.com/minimog/media/catalog/product/cache/17ee04dfcbcbea0032b22e4d0a0ac895/p/r/product_fashion_16_a_1.jpeg',
            name: 'Square Shoulder Bag',
            cost: '55.000',
        },
    ];

    return (
        <Box
            className="container-app"
            //maxHeight: 742, overflow: 'hidden'
            sx={{ padding: 0, marginBottom: 24 }}
        >
            {ItemWishList.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {ArrayWishList.map((Item) => (
                            <Grid item lg={3} md={4} xs={12}>
                                <ItemWishList
                                    avatar={Item.avatar}
                                    name={Item.name}
                                    cost={Item.cost}
                                ></ItemWishList>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        typeButton="primary"
                        sx={{ margin: '26px 0 0 15px' }}
                    >
                        Add All to Cart
                    </Button>
                </>
            ) : (
                <Alert severity="warning">
                    You have no items in your wish list.
                </Alert>
            )}
        </Box>
    );
};

Wishlist.getLayout = (page) => {
    return (
        <ClientLayout>
            <PageTop
                title="My Wish List"
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
                        name: 'Wishlist',
                    },
                ]}
            />
            <AccountLayout>{page}</AccountLayout>
        </ClientLayout>
    );
};

export default Wishlist;
