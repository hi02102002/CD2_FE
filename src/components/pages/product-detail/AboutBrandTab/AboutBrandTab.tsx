import Image from 'next/image';

import { Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

import logo from '@/../public/logo.png';
import { pxToRem } from '@/utils/pxToRem';

function AboutBrandTab() {
    return (
        <Grid container>
            <Grid item md={4} xs={12}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <Image src={logo} alt=""></Image>
                    <Link
                        variant="body2"
                        href="#"
                        color="#000"
                        fontSize={pxToRem(16)}
                        sx={{ paddingTop: `${pxToRem(16)}` }}
                    >
                        More product
                    </Link>
                </Box>
            </Grid>
            <Grid item md={8} xs={12} sx={{ padding: '0 15px' }} paddingX={15}>
                <Typography variant="h4" marginY={10} fontSize={20}>
                    Minimog
                </Typography>
                <Typography
                    variant="body1"
                    color="#666"
                    pt={15}
                    lineHeight={1.75}
                >
                    S celerisque justo condimentum est venenatis morbi mi
                    senectus a enim vestibulum sodales placerat parturient
                    penatibus lacus vestibulum suspendisse cras parturient
                    magnis a vestibulum. Augue ante platea consectetur velit
                    taciti quis pulvinar egestas aliquam pharetra iaculis a dui
                    eu euismod justo convallis. Natoque a dignissim tristique a
                    non purus a dui euismod neque mus non a adipiscing
                    vestibulum.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default AboutBrandTab;
