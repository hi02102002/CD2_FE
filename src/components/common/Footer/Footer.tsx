import * as React from 'react';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandTwitter,
    IconHeart,
    IconSearch,
    IconShoppingCart,
} from '@tabler/icons-react';

import img from '@/components/common/Footer/payment.png';

export default function Footer() {
    return (
        <div className="footer">
            <Box
                className="menu-card"
                sx={{
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    height: 340,
                    paddingLeft: 53,
                    paddingRight: 53,
                }}
            >
                <Card
                    className="card-item"
                    sx={{
                        minWidth: 361,
                        height: 338,
                        borderRadius: 0,
                        boxShadow: 0,
                        backgroundColor: '#f5f5f5',
                        borderRight: '1px solid #dedede',
                        // paddingTop: 75,
                        // paddingBottom: 52,
                        // paddingLeft: 15,
                        // paddingRight: 15,
                        padding: '75px 15px 52px 15px',
                    }}
                >
                    <CardContent sx={{}}>
                        <Typography
                            variant="h3"
                            sx={{ fontSize: 16, fontWeight: 600 }}
                            color="#000"
                            gutterBottom
                        >
                            Company
                        </Typography>
                        <Typography component="div" sx={{ paddingTop: 20 }}>
                            Find a location nearest you.
                        </Typography>
                        <Typography component="div" sx={{ paddingTop: 5 }}>
                            See Our Stores
                        </Typography>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div" sx={{ paddingTop: 20 }}>
                                +391 (0)35 2568 4593
                            </Typography>
                        </Link>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div" sx={{ paddingTop: 5 }}>
                                hello@domain.com
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
                <Card
                    className="card-item"
                    sx={{
                        minWidth: 361,
                        height: 338,
                        borderRadius: 0,
                        boxShadow: 0,
                        backgroundColor: '#f5f5f5',
                        //border: '1px solid #dedede',
                        borderRight: '1px solid #dedede',
                        paddingTop: 75,
                        paddingBottom: 52,
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}
                >
                    <CardContent sx={{}}>
                        <Typography
                            variant="h3"
                            sx={{ fontSize: 16, fontWeight: 600 }}
                            color="#000"
                            gutterBottom
                        >
                            Company
                        </Typography>
                        <Typography component="div">
                            Find a location nearest you.
                        </Typography>
                        <Typography component="div">See Our Stores</Typography>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                +391 (0)35 2568 4593
                            </Typography>
                        </Link>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                hello@domain.com
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
                <Card
                    className="card-item"
                    sx={{
                        minWidth: 361,
                        height: 338,
                        borderRadius: 0,
                        boxShadow: 0,
                        backgroundColor: '#f5f5f5',
                        //border: '1px solid #dedede',
                        borderRight: '1px solid #dedede',
                        paddingTop: 75,
                        paddingBottom: 52,
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}
                >
                    <CardContent sx={{}}>
                        <Typography
                            variant="h3"
                            sx={{ fontSize: 16, fontWeight: 600 }}
                            color="#000"
                            gutterBottom
                        >
                            Company
                        </Typography>
                        <Typography component="div">
                            Find a location nearest you.
                        </Typography>
                        <Typography component="div">See Our Stores</Typography>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                +391 (0)35 2568 4593
                            </Typography>
                        </Link>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                hello@domain.com
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
                <Card
                    className="card-item"
                    sx={{
                        minWidth: 361,
                        height: 338,
                        borderRadius: 0,
                        boxShadow: 0,
                        backgroundColor: '#f5f5f5',
                        //border: '1px solid #dedede',
                        // borderRight: '1px solid #dedede',
                        paddingTop: 75,
                        paddingBottom: 52,
                        paddingLeft: 15,
                        paddingRight: 15,
                    }}
                >
                    <CardContent sx={{}}>
                        <Typography
                            variant="h3"
                            sx={{ fontSize: 16, fontWeight: 600 }}
                            color="#000"
                            gutterBottom
                        >
                            Company
                        </Typography>
                        <Typography component="div">
                            Find a location nearest you.
                        </Typography>
                        <Typography component="div">See Our Stores</Typography>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                +391 (0)35 2568 4593
                            </Typography>
                        </Link>
                        <Link href="#" underline="none" color="#666666">
                            <Typography component="div">
                                hello@domain.com
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
            </Box>
            <Box
                className="footer-contact"
                sx={{
                    border: '1px solid #dedede',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 73,
                    paddingRight: 53,
                    paddingLeft: 53,
                }}
            >
                {/* <img
                    className="img-pay"
                    src="https://blueskytechmage.com/minimog/media/wysiwyg/payment.png"
                /> */}
                <Image src={img} alt="" />
                <Typography
                    variant="h2"
                    sx={{ fontSize: 14 }}
                    color="#000"
                    gutterBottom
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
                    <Link
                        href="https://www.facebook.com/"
                        underline="none"
                        color="#666666"
                    >
                        <IconBrandFacebook color="#000" />
                    </Link>
                    <Link
                        href="https://twitter.com/"
                        underline="none"
                        color="#666666"
                    >
                        <IconBrandTwitter color="#000" />
                    </Link>
                    <Link
                        href="https://www.instagram.com/"
                        underline="none"
                        color="#666666"
                    >
                        <IconBrandInstagram color="#000" />
                    </Link>
                    <Link
                        href="https://www.tiktok.com/"
                        underline="none"
                        color="#666666"
                    >
                        <IconBrandTiktok color="#000" />
                    </Link>
                </Box>
            </Box>
            <style jsx>{`
                .img-pay {
                    width: 291px;
                    height: 22px;
                }
            `}</style>
        </div>
    );
}
