import styled from "@emotion/styled"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from "@mui/system"
import { Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import { pxToRem } from "@/utils/pxToRem";
import ProductDetails from "../ProductDetails";
import Image from "next/image";

import img from '@/assets/washing-instruction.png';
import img1 from '@/assets/product_fashion_22_a_4.jpeg';
import logo from '@/../public/logo.png';
import Review from "../Review";
import { DEVICE } from "@/constants";
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function ProductInfoItems(){
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return <StyledProductInfoItems component='div'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs" defaultValue={0} variant="scrollable" scrollButtons allowScrollButtonsMobile>
                <Tab className="btn-changetab" label="Details" {...a11yProps(0)}/>
                {/* <Box> */}
                    <Tab className="btn-changetab" label={`Reviews ${(1)}`} {...a11yProps(1)}/>
                {/* </Box> */}
                <Tab className="btn-changetab" label="About Brand" {...a11yProps(2)}/>
                <Tab className="btn-changetab" label="Shipping and Returns" {...a11yProps(3)}/>
                
            </Tabs>
         </Box>
         <TabPanel value={value} index={0}>
            <DescItem component='div' >
                <Typography variant="h3" fontWeight='400' marginBottom={pxToRem(15)}>The Iconic Silhouette</Typography>
                <Typography variant="body1" color='#666' lineHeight='1.75' marginBottom='35px'>He garments labelled as Committed are products that have been produced using sustainable fibers or processes, reducing their environmental impact. Mango’s goal is to support the implementation of practices more committed to the environment, and therefore increase the number of sustainable garments in the collection.</Typography>
                <StyledBox component='div' >
                    <ProductDetails classname="product-details-item" title="Infomation" >
                        <ul style={{listStyleType:'circle',paddingLeft:'17px'}} className='list-info'>
                            <li>Cutaway collar</li>
                            <li>Front button fastening</li>
                            <li>Chest patch pocket</li>
                            <li>Long sleeves</li>
                        </ul>
                    </ProductDetails>

                    <ProductDetails classname="product-details-item" title="Composition" >
                        <ul style={{listStyleType:'circle',paddingLeft:'17px'}} className='list-info'>
                            <li>Outer: Polyamide 30%</li>
                            <li>Lining: Polyester 70%</li>
                     
                        </ul>
                    </ProductDetails>

                    <ProductDetails classname="product-details-item" title="Infomation" >
                            <Typography variant="body1">Model is 1.84 m wearing size M</Typography>
                    </ProductDetails>

                    <ProductDetails classname="product-details-item" title="Infomation" >
                        <Image src={img} alt=''></Image>
                        <Typography variant="body1" sx={{marginTop:'30px'}}>Machine wash, no ironing, don’t dry clean, don’t tumble dry</Typography>
                    </ProductDetails>


                    
                </StyledBox>
                <BottomDetails component='div' >
                    <Box component='div' className="bottom-details-img">
                        <Image src={img1} alt=''></Image>
                    </Box>
                    <Box component='div' className="bottom-details-desc">
                        <Typography variant="caption">Poplin top with ruffle trim</Typography>
                        <Typography variant="body1">We believe in crafting pieces where sustainability and style go hand in hand. Made from materials like recycled cashmere and sust</Typography>
                    </Box>
                </BottomDetails>
            </DescItem>
        </TabPanel>

        

        <TabPanel value={value} index={1}>
            <Review></Review>
        </TabPanel>

        <TabPanel value={value} index={2}>

            <Grid container sx={{paddingTop:`${pxToRem(60)}`}}>
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
        </TabPanel>

        <TabPanel value={value} index={3}>
            <Typography sx={{paddingTop:'60px'}} variant="body1">Shipping cost is based on weight. Just add products to your cart and use the Shipping Calculator to see the shipping price. We want you to be 100% satisfied with your purchase. Items can be returned or exchanged within 30 days of delivery.</Typography>
        </TabPanel>
         
    </StyledProductInfoItems>
    
}

const StyledProductInfoItems = styled(Box)`
        margin-bottom: ${pxToRem(70)};
    .btn-changetab{
        margin-right: ${pxToRem(64)};
        color: #b3b3c4;
        font-weight: 600;
        text-transform: none;
        font-size: ${pxToRem(18)};
    }

    .btn-changetab.Mui-selected{
        color: #000;
    }

    
`

const DescItem = styled(Box)`
    padding-top: ${pxToRem(60)};

    .list-info{

        li{
            margin-bottom: ${pxToRem(12)};
        }
    }

`

const BottomDetails = styled(Box)`
    display: flex;
    justify-content: center;
    
    .bottom-details-img{
        padding-right: 30px;
        img{
        width: 100%;
        height: 340px;

       

    }
    }
        div{
            width: 50%;

        }
   .bottom-details-desc{
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;

    span {
        font-size: ${pxToRem(42)};
        color: #000;
    }

    p{
        line-height:1.75;
    }
   }
        @media ${DEVICE.mobileS} {
            flex-direction: column;
            display: flex;

            .bottom-details-img{
                width: 100%;
                padding-right: 0;
            }

            .bottom-details-desc{
                width: 100%;
            }
            
        }

        @media ${DEVICE.tablet} {
            flex-direction: row;

            .bottom-details-img{
                padding-right: ${pxToRem(30)};
            }
        }
        
`

const StyledBox = styled(Box)`
    display: flex;
    margin-bottom: ${pxToRem(60)};

    @media ${DEVICE.mobileS} {
            flex-direction: column;
            .product-details-item{
                width: 100%;
            }
        }

        @media ${DEVICE.tablet} {
            flex-direction: row;
        }

    
    
`
export default ProductInfoItems