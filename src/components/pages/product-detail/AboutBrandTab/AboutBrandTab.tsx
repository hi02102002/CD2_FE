import { Box } from "@mui/system"
import { Grid, Link, Typography } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import Image from "next/image";

import logo from '@/../public/logo.png';


function AboutBrandTab(){
    return <Grid container sx={{paddingTop:`${pxToRem(60)}`}}>
        <Grid item md={4} xs={12}>
            <Box component='div' sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}}>
                <Image src={logo} alt='' ></Image>
                <Link variant="body2" href="#" color='#000' fontSize={pxToRem(16)} sx={{paddingTop:`${pxToRem(16)}`}}>More product</Link>
            </Box>

        </Grid>
        <Grid item md={8} xs={12} sx={{padding:'0 15px'}}>
            <Typography variant="h4" sx={{margin:'10px 0',fontSize:'20px'}}>Minimog</Typography>
            <Typography variant="body1" color='#666' sx={{paddingTop:'15px',lineHeight:'1.75'}}>S celerisque justo condimentum est venenatis morbi mi senectus a enim vestibulum sodales placerat parturient penatibus lacus vestibulum suspendisse cras parturient magnis a vestibulum. Augue ante platea consectetur velit taciti quis pulvinar egestas aliquam pharetra iaculis a dui eu euismod justo convallis. Natoque a dignissim tristique a non purus a dui euismod neque mus non a adipiscing vestibulum.</Typography>
        </Grid>
        
    </Grid>
}

export default AboutBrandTab