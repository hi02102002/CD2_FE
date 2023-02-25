import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@mui/material';
import { Box, BoxProps, Card, CardContent, Grid, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { common } from '@mui/material/colors';
import {
    IconArrowRight,
    IconBoxSeam,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandTwitter,
    IconCoin,
    IconHeadphones,
    IconInbox,
    IconMail,
} from '@tabler/icons-react';

import img from '@/assets/footer-payment.png';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';
import { theme } from '@/utils/themes';

type ItemTopFooterProps = {
    icon: React.ReactNode;
    title: string;
    des: string;
};

const ItemTopFooter = ({ icon, title, des }: ItemTopFooterProps) => {
    return (
        <Grid item xs={12} md={6} xl={3}>
            <Box
                className="top-footer-item"
                sx={{
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        '& svg': {
                            width: 32,
                            height: 32,
                            color: common.black,
                        },
                    }}
                    title={title}
                >
                    {<>{icon}</>}
                </Box>
                <Box sx={{ paddingLeft: 20 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: pxToRem(20),
                            fontWeight: 600,
                        }}
                        color={common.black}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            fontSize: pxToRem(16),
                        }}
                        color={theme.themeColor.primary}
                    >
                        {des}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
};

export default function Footer() {
    const theme = useTheme();
    return (
        <Box
            component="div"
            className="footer"
            sx={{ backgroundColor: theme.themeColor.footerBg }}
        >
            <Box
                component="div"
                className="top-footer"
                sx={{
                    backgroundColor: common.white,
                    borderTop: '1px solid #eee',
                    padding: `${pxToRem(40)} ${pxToRem(55)}`,
                    marginTop: 100,
                }}
            >
                <Grid container spacing={30}>
                    <ItemTopFooter
                        title="Free Shipping"
                        icon={<IconBoxSeam></IconBoxSeam>}
                        des="Free Shipping for orders over £130"
                    ></ItemTopFooter>
                    <ItemTopFooter
                        title="Money Guarantee"
                        icon={<IconCoin></IconCoin>}
                        des="Within 30 days for an exchange."
                    ></ItemTopFooter>
                    <ItemTopFooter
                        title="Online Support"
                        icon={<IconHeadphones></IconHeadphones>}
                        des="24 hours a day, 7 days a week"
                    ></ItemTopFooter>
                    <ItemTopFooter
                        title="Flexible Payment"
                        icon={<IconInbox></IconInbox>}
                        des="Pay with Multiple Credit Cards"
                    ></ItemTopFooter>
                </Grid>
            </Box>
            <StyledMainFooter component="div" className="main-footer">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} xl={3}>
                        <Card className="card-item" sx={{ boxShadow: 0 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: `${pxToRem(18)} 0`,
                                    }}
                                    color={common.black}
                                >
                                    Company
                                </Typography>
                                <Typography sx={{ marginBottom: 9 }}>
                                    Find a location nearest you.
                                </Typography>
                                <Typography sx={{ marginBottom: 24 }}>
                                    See Our Stores
                                </Typography>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{ marginBottom: 9 }}
                                        title="+391 (0)35 2568 4593"
                                    >
                                        +391 (0)35 2568 4593
                                    </Typography>
                                </Link>
                                <Link href="mailto:webmaster@example.com">
                                    <Typography sx={{}}>
                                        hello@domain.com
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                        <Card className="card-item" sx={{ boxShadow: 0 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: `${pxToRem(18)} 0`,
                                    }}
                                    color={common.black}
                                >
                                    Information
                                </Typography>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        My account
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Login
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        My cart
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Wishlist
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Check out
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                        <Card className="card-item" sx={{ boxShadow: 0 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: `${pxToRem(18)} 0`,
                                    }}
                                    color={common.black}
                                >
                                    Services
                                </Typography>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        About Us
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Privacy Policy
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Faq's
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            marginBottom: 9,
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Contact us
                                    </Typography>
                                </Link>
                                <Link href="./abc.tsx">
                                    <Typography
                                        sx={{
                                            '&: hover': { opacity: 0.5 },
                                        }}
                                    >
                                        Delivery Inforamtion
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} xl={3}>
                        <Card className="card-item" sx={{ boxShadow: 0 }}>
                            <CardContent sx={{ padding: 0 }}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        margin: `${pxToRem(18)} 0`,
                                    }}
                                    color={common.black}
                                >
                                    Subscribe
                                </Typography>
                                <Typography sx={{ marginBottom: 9 }}>
                                    Enter your email below to be the first to
                                    know about new collections and product
                                    launches.
                                </Typography>
                                <form
                                    className="box-email"
                                    action="mailto:webmaster@example.com"
                                >
                                    <Box
                                        sx={{
                                            '& svg': {
                                                width: 22,
                                                height: 22,
                                            },
                                        }}
                                    >
                                        <IconMail></IconMail>
                                    </Box>
                                    <input
                                        className="email-input"
                                        placeholder="Your email address"
                                        type="email"
                                        id="emails"
                                        name="emails"
                                        title="Please write your email address"
                                        multiple
                                    />
                                    <button
                                        className="email-submit"
                                        type="submit"
                                    >
                                        <IconArrowRight />
                                    </button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </StyledMainFooter>
            <StyledBottomFooter className="bottom-footer">
                <Image src={img} alt="" />
                <Typography
                    variant="h3"
                    sx={{ fontSize: pxToRem(14), fontWeight: 500, padding: 10 }}
                    color={common.black}
                >
                    © MINIMOG 2022
                </Typography>
                <Box
                    className="social"
                    sx={{
                        width: 240,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href="https://www.facebook.com/">
                        <IconBrandFacebook color={common.black} />
                    </Link>
                    <Link href="https://twitter.com/">
                        <IconBrandTwitter color={common.black} />
                    </Link>
                    <Link href="https://www.instagram.com/">
                        <IconBrandInstagram color={common.black} />
                    </Link>
                    <Link href="https://www.tiktok.com/">
                        <IconBrandTiktok color={common.black} />
                    </Link>
                </Box>
            </StyledBottomFooter>
            <style jsx>{`
                .box-email {
                    display: flex;
                    align-items: center;
                    background-color: ${common.white};
                    border-radius: ${pxToRem(5)};
                    padding: ${pxToRem(8)};
                    margin-right: 35px;
                }
                .email-input {
                    flex: 1;
                    padding-left: ${pxToRem(12)};
                    border: none;
                    outline: none;
                }
                .email-submit {
                    border: none;
                    background-color: transparent;
                }
                @media screen and (${DEVICE.tablet}) {
                    .bottom-footer {
                        flex-direction: column;
                    }
                }
            `}</style>
        </Box>
    );
}

const StyledMainFooter = styled(Box)<BoxProps>`
    box-shadow: 0;
    & .card-item {
        height: 100%;
        border-radius: 0;
        border-top: 1px solid #dedede;
        padding: 8px 0 8px 35px;
        background-color: ${theme.themeColor.footerBg};
        border-right: 1px solid #dedede;
        @media screen and (${DEVICE.laptopM}) {
            padding: 58px 0 58px 35px;
            border-top: none;
        }
    }
`;

const StyledBottomFooter = styled(Box)<BoxProps>`
    margin: 0;
    border: ${pxToRem(1)} solid #dedede;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(16)} ${pxToRem(55)};
    flex-direction: column;

    @media screen and (${DEVICE.tablet}) {
        flex-direction: row;
    }
`;
