import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    TypographyProps,
    css,
    styled,
} from '@mui/material';
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
        <Grid item xs={12} md={6} xl={3} component="div" className="grid-item">
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
    return (
        <StyledFooter component="footer">
            <StyledTopFooter component="div" className="top-footer">
                <Box component="div" className="container-app">
                    <Grid container spacing={30}>
                        <ItemTopFooter
                            title="Free Shipping"
                            icon={<IconBoxSeam />}
                            des="Free Shipping for orders over £130"
                        />
                        <ItemTopFooter
                            title="Money Guarantee"
                            icon={<IconCoin />}
                            des="Within 30 days for an exchange."
                        />
                        <ItemTopFooter
                            title="Online Support"
                            icon={<IconHeadphones />}
                            des="24 hours a day, 7 days a week"
                        />
                        <ItemTopFooter
                            title="Flexible Payment"
                            icon={<IconInbox />}
                            des="Pay with Multiple Credit Cards"
                        />
                    </Grid>
                </Box>
            </StyledTopFooter>
            <StyledMainFooter component="div" className="main-footer">
                <Box component="div" className="container-app">
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={3}
                            component="div"
                            className="grid-item"
                        >
                            <Card className="card-item">
                                <CardContent sx={{ padding: 0 }}>
                                    <StyledMainFooterTitle variant="h4">
                                        Company
                                    </StyledMainFooterTitle>
                                    <StyledMainFooterText>
                                        Find a location nearest you.
                                    </StyledMainFooterText>
                                    <StyledMainFooterText
                                        sx={{ marginBottom: 24 }}
                                    >
                                        See Our Stores
                                    </StyledMainFooterText>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText title="+391 (0)35 2568 4593">
                                            +391 (0)35 2568 4593
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="mailto:webmaster@example.com">
                                        <StyledMainFooterText>
                                            hello@domain.com
                                        </StyledMainFooterText>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={3}
                            component="div"
                            className="grid-item"
                        >
                            <Card className="card-item">
                                <CardContent sx={{ padding: 0 }}>
                                    <StyledMainFooterTitle variant="h4">
                                        Information
                                    </StyledMainFooterTitle>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            My account
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Login
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            My cart
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Wishlist
                                        </StyledMainFooterText>
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
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={3}
                            component="div"
                            className="grid-item"
                        >
                            <Card className="card-item">
                                <CardContent sx={{ padding: 0 }}>
                                    <StyledMainFooterTitle variant="h4">
                                        Services
                                    </StyledMainFooterTitle>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            About Us
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Privacy Policy
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Faq&apos;s
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Contact us
                                        </StyledMainFooterText>
                                    </Link>
                                    <Link href="./abc.tsx">
                                        <StyledMainFooterText isHover>
                                            Delivery Information
                                        </StyledMainFooterText>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            xl={3}
                            component="div"
                            className="grid-item"
                        >
                            <Card className="card-item">
                                <CardContent sx={{ padding: 0 }}>
                                    <StyledMainFooterTitle variant="h4">
                                        Subscribe
                                    </StyledMainFooterTitle>
                                    <StyledMainFooterText>
                                        Enter your email below to be the first
                                        to know about new collections and
                                        product launches.
                                    </StyledMainFooterText>
                                    <StyledMainFooterFormWrapper>
                                        <form
                                            className="box-email"
                                            action="mailto:webmaster@example.com"
                                        >
                                            <IconMail width={22} height={22} />
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
                                    </StyledMainFooterFormWrapper>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </StyledMainFooter>
            <StyledBottomFooter>
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
        </StyledFooter>
    );
}

const StyledFooter = styled(Box)`
    margin-top: ${pxToRem(100)};
`;

const StyledTopFooter = styled(Box)`
    background-color: ${common.white};
    border-top: 1px solid #eee;
    padding: ${pxToRem(40)} 0;
`;

const StyledMainFooter = styled(Box)`
    background-color: ${theme.themeColor.footerBg};
    padding-top: ${pxToRem(30)};
    padding-bottom: ${pxToRem(15)};
    .card-item {
        height: 100%;
        border-radius: 0;
        border-top: 0;
        border-right: 0;
        box-shadow: none;
        background-color: inherit;
        @media screen and (${DEVICE.laptopM}) {
            padding: 58px 0 58px 35px;
            border-top: none;
        }
    }

    @media screen and (${DEVICE.laptopM}) {
        padding: 0;

        .card-item {
            padding: 58px 0 58px 35px;
            border-top: none;
        }

        .grid-item:not(:last-child) .card-item {
            border-right: 1px solid #dedede;
        }
    }
`;

const StyledMainFooterTitle = styled(Typography)`
    font-size: ${pxToRem(16)};
    margin-bottom: ${pxToRem(18)};
`;

const StyledMainFooterText = styled(Typography)<
    TypographyProps & {
        isHover?: boolean;
    }
>`
    margin-bottom: ${pxToRem(9)};
    transition: opacity 0.3s ease;
    ${({ isHover }) =>
        isHover
            ? css`
                  &:hover {
                      opacity: 0.7;
                  }
              `
            : undefined}
`;

const StyledMainFooterFormWrapper = styled(Box)`
    .box-email {
        display: flex;
        align-items: center;
        background-color: ${common.white};
        border-radius: ${pxToRem(5)};
        padding: ${pxToRem(8)};
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
        cursor: pointer;
    }
`;
const StyledBottomFooter = styled(Box)`
    margin: 0;
    border: ${pxToRem(1)} solid #dedede;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(16)} ${pxToRem(55)};
    flex-direction: column;
    gap: ${pxToRem(8)};

    @media screen and (${DEVICE.laptopM}) {
        flex-direction: row;
    }
`;
