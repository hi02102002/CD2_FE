import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { Typography } from "@mui/material";
import { pxToRem } from "@/utils/pxToRem";
import DetailTabItem from "../DetailTabItem";
import Image from "next/image";

import img from '@/assets/washing-instruction.png';
import img1 from '@/assets/product_fashion_22_a_4.jpeg';
import { DEVICE } from "@/constants";

function DetailTab(){
    return <DescItem component='div' >
    <Typography variant="h3" fontWeight='400' marginBottom={pxToRem(15)}>The Iconic Silhouette</Typography>
    <Typography variant="body1" color='#666' lineHeight='1.75' marginBottom='35px'>He garments labelled as Committed are products that have been produced using sustainable fibers or processes, reducing their environmental impact. Mango’s goal is to support the implementation of practices more committed to the environment, and therefore increase the number of sustainable garments in the collection.</Typography>
    <StyledBox component='div' >
        <DetailTabItem classname="product-details-item" title="Infomation" >
            <ul style={{listStyleType:'circle',paddingLeft:'17px'}} className='list-info'>
                <li>Cutaway collar</li>
                <li>Front button fastening</li>
                <li>Chest patch pocket</li>
                <li>Long sleeves</li>
            </ul>
        </DetailTabItem>

        <DetailTabItem classname="product-details-item" title="Composition" >
            <ul style={{listStyleType:'circle',paddingLeft:'17px'}} className='list-info'>
                <li>Outer: Polyamide 30%</li>
                <li>Lining: Polyester 70%</li>
         
            </ul>
        </DetailTabItem>

        <DetailTabItem classname="product-details-item" title="Composition" >
                <Typography variant="body1">Model is 1.84 m wearing size M</Typography>
        </DetailTabItem>

        <DetailTabItem classname="product-details-item" title="Washing Instructions" >
            <Image src={img} alt=''></Image>
            <Typography variant="body1" sx={{marginTop:'30px'}}>Machine wash, no ironing, don’t dry clean, don’t tumble dry</Typography>
        </DetailTabItem>


        
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
}

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

export default DetailTab