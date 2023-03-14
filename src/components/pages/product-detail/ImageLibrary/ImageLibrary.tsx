import { Button } from "@/components/common"
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Grid, styled } from '@mui/material';
import { pxToRem } from '@/utils/pxToRem';
import { IconArrowNarrowDown, IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowNarrowUp } from "@tabler/icons-react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
import Image from "next/image";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import img1 from '@/assets/product_fashion_22_a_1.jpeg'
import img2 from '@/assets/product_fashion_22_a_2.jpeg'
import img3 from '@/assets/product_fashion_22_a_3.jpeg'
import img4 from '@/assets/product_fashion_22_a_4.jpeg'
import img5 from '@/assets/product_fashion_22_b_1.jpeg'
import img6 from '@/assets/product_fashion_22_b_2.jpeg'
import img7 from '@/assets/product_fashion_22_b_3.jpeg'
import img8 from '@/assets/product_fashion_22_b_4.jpeg'
import { DEVICE } from "@/constants";

const imgs = [img1, img2, img3, img4, img5,img6,img7,img8];


function ImageLibrary(){

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    
    return <StyledImageLibrary container item md={6.5} xs={12} className='product-images' >
    <Grid item md='auto' xs={0} className="left-thumb">
    
    <Button
             className="slider-prev"
             typeButton="secondary"
         >
             <IconArrowNarrowUp />
     </Button>
         
     <Swiper
     scrollbar={{ draggable: true }}
     onSwiper={setThumbsSwiper}
     spaceBetween={1}
     slidesPerView={6}
     // freeMode={true}
     watchSlidesProgress={true}
     modules={[ Navigation, Thumbs]}
     className="mySwiper"
     direction="vertical"
     navigation={{nextEl:'.slider-next',
                 prevEl:'.slider-prev'}}

     >
         {imgs.map((img,index) =>{
             return <SwiperSlide key={index}>
             <Box component='div' className="gallery-img" ><Image width='70' height='91' src={img} alt=''></Image></Box>
         </SwiperSlide>
         })}
     </Swiper>

     <Button
                 className="slider-next"
                 typeButton="secondary"
             >
                 <IconArrowNarrowDown />
     </Button>

         
    </Grid>

    <Grid item md={9.5} xs={12} className="right-thumb">
    
    <Swiper
     loop={true}
     spaceBetween={0}
     slidesPerView={1}
     navigation={{nextEl:'.sliderImg-next',
     prevEl:'.sliderImg-prev'}}

     thumbs={{ swiper: thumbsSwiper }}
     modules={[ Navigation, Thumbs]}
     className="mySwiper2"
     
     >
     

      {imgs.map((img,index) =>{
         return <SwiperSlide key={index}>
             <Button
             className="sliderImg-prev"
             typeButton="secondary"
         >
             <IconArrowNarrowLeft />
             </Button>

     <Box
             paddingTop={`${1.30888030888 * 100}%`}
             component="div"
             className="img-wrapper"
         >
             <Image
                 src={img}
                 alt=""
                 fill
                 style={{
                     objectFit: 'cover',
                 }}
                 draggable={false}
             />

      </Box>

      <Button
             className="sliderImg-next"
             typeButton="secondary"
         >
             <IconArrowNarrowRight />
     </Button>
     </SwiperSlide>
     })}
     

     </Swiper>

    </Grid>
 </StyledImageLibrary>
}

const StyledImageLibrary =  styled(Grid)`

    .mySwiper{
        padding-right: ${pxToRem(6)};
        height: 100%;
        overflow: hidden;

        .swiper-slide-thumb-active{
            .gallery-img{
                /* display: inline-flex; */
            border: 1px solid transparent;
            transition: all .25s cubic-bezier(.645,.045,.355,1);
            border-color: #000;
            cursor: pointer;


             img{
                transform: scale3d(.86,.90,.86);
                transition: all .35s cubic-bezier(.645,.045,.355,1);
             }


        }
        }

        .gallery-img{
            border: 1px solid transparent;
            transition: all .25s cubic-bezier(.645,.045,.355,1);
            cursor: pointer;

            &:hover img{
                transform: scale3d(.86,.90,.86);
                transition: all .35s cubic-bezier(.645,.045,.355,1);

            }

            &:hover {
                border-color: #000;
            }
        }

        .swiper-wrapper{
            .swiper-slide{
            width: 100% !important;
            height: 100px !important;
        }
        }
    }
        .left-thumb  {
            height: 602px;
            position: relative;
            overflow: hidden;
            .slider-prev,.slider-next{
                z-index: 999;
                position: absolute;
                display: none;
                width: ${pxToRem(30)};
                height: ${pxToRem(30)};
                padding: 0;
                border: 0;
                border-radius: 100%;
            }

            

            .slider-prev{
                top: 0;
                left: 20px;
            }

            .slider-next{
                bottom: 0px;
                left: 20px;
            }

            &:hover .slider-prev{
                display: block;
            }
            &:hover .slider-next{
                display: block;
            }


            @media ${DEVICE.mobileS}{
                display: none;
            }

            @media ${DEVICE.tablet}{
                display: block;
            }
        }


        .right-thumb  {

           

            .sliderImg-prev,.sliderImg-next{
                z-index: 999;
                position: absolute;
                display: none;
                width: ${pxToRem(45)};
                height: ${pxToRem(45)};
                padding: 0;
                border: 0;
                border-radius: 100%;
            }

            .sliderImg-prev{
                top: 50%;
                transform: translateY(-50%);
            }

            .sliderImg-next{
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }

            &:hover .sliderImg-prev{
                display: block;
            }
            &:hover .sliderImg-next{
                display: block;
            }
           

        }
    
    
`

export default ImageLibrary