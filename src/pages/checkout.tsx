import {
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
    styled,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';

import { CartItem } from '@/components/client';
import { Button, Input, PageTop } from '@/components/common';
import { ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const Checkout: NextPageWithLayout<Props> = () => {
    return (
        <Box>
            <PageTop
                title="Express Checkout"
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.CHECKOUT,
                        name: 'Checkout',
                    },
                ]}
            />
            <Box component="div" className="container-app">
                <form>
                    <Grid container spacing={32}>
                        <Grid item xs={12} md={6}>
                            <StyledTitle variant="h4">
                                Shipping Address
                            </StyledTitle>
                            <Stack spacing={16}>
                                <Input
                                    label="Email address"
                                    required
                                    placeholder="Email address"
                                />
                                <Input
                                    label="Full name"
                                    required
                                    placeholder="Full name"
                                />
                                <Input
                                    label="Street Address"
                                    required
                                    placeholder="Street address"
                                />
                                <Input
                                    label="City"
                                    required
                                    placeholder="City"
                                />
                                <Input
                                    label="Zip/Postal Code"
                                    required
                                    placeholder="Zip/Postal code"
                                />
                                <Input
                                    label="Country"
                                    required
                                    placeholder="Country"
                                />
                                <Input
                                    label="State/Province"
                                    required
                                    placeholder="State/Province"
                                />
                                <Input label="Company" placeholder="Company" />
                                <Input
                                    label="Phone Number"
                                    placeholder="Phone number"
                                    required
                                />
                            </Stack>
                        </Grid>

                        <Grid item container xs={12} md={6} spacing={32}>
                            <Grid item xs={12}>
                                <Box>
                                    <StyledTitle variant="h4">
                                        Payment Method
                                    </StyledTitle>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <StyledFormControlLabel
                                            value="female"
                                            control={<Radio disableRipple />}
                                            label="Check / Money order"
                                        />
                                        <StyledFormControlLabel
                                            value="male"
                                            control={<Radio disableRipple />}
                                            label="Cash On Delivery"
                                        />
                                        <StyledFormControlLabel
                                            value="other"
                                            control={<Radio disableRipple />}
                                            label="Bank Transfer Payment"
                                        />
                                    </RadioGroup>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTitle variant="h4">
                                    Order Summary
                                </StyledTitle>
                                <StyledListCart>
                                    <StyledCartItem />
                                    <StyledCartItem />
                                    <StyledCartItem />
                                    <StyledCartItem />
                                    <StyledCartItem />
                                </StyledListCart>
                                <Stack gap={16} paddingY={16}>
                                    <Stack gap={8}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>
                                                Cart subtotal
                                            </Typography>
                                            <Typography>$65.00</Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>Shipping</Typography>
                                            <Typography>$20.00</Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography>Order total</Typography>
                                            <Typography fontWeight={500}>
                                                $85.00
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Box>
                                        <Input
                                            label="Order comment"
                                            multiline
                                            sx={{
                                                'textarea.MuiInputBase-input': {
                                                    minHeight: 70,
                                                    maxHeight: 200,
                                                    paddingTop: 16,
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Stack direction="row" gap={16}>
                                        <Input
                                            placeholder="Enter discount code"
                                            sx={{
                                                height: '100%',
                                                '.MuiInputBase-input ': {
                                                    height: '100%',
                                                },
                                            }}
                                        />
                                        <Button
                                            typeButton="secondary"
                                            sx={{
                                                flexShrink: 0,
                                            }}
                                        >
                                            Apply Discount
                                        </Button>
                                    </Stack>
                                    <Button>Place Order</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

Checkout.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

const StyledTitle = styled(Typography)`
    margin-bottom: ${pxToRem(18)};
    padding-bottom: ${pxToRem(16)};
    border-bottom: 1px solid ${grey[300]};
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    margin: 0;
    border: 0;
    user-select: none;

    &:not(:last-child) {
        border-bottom: 1px solid ${grey[300]};
    }
`;

const StyledListCart = styled(Box)`
    max-height: ${pxToRem(420)};
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const StyledCartItem = styled(CartItem)`
    &:not(:last-child) {
        padding-bottom: ${pxToRem(16)};
        border-bottom: 1px solid ${grey[300]};
    }

    &:not(:first-child) {
        padding-top: ${pxToRem(16)};
    }

    .img-wrapper {
        max-width: ${pxToRem(75)};
        padding-bottom: 20%;
    }

    .btn-remove {
        display: none;
    }
`;

export default Checkout;
