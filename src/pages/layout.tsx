import {  useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, styled,Grid, Typography, Rating } from '@mui/material';
import { Button, PageTop, Tooltip } from '@/components/common';
import {  DEVICE, ROUTES } from '@/constants';
import { ClientLayout } from '@/layouts/client';
import { NextPageWithLayout } from '@/types/shared';
import { pxToRem } from '@/utils/pxToRem';

import {  Navigation, Thumbs } from "swiper";


import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import Image from "next/image";
import { IconArrowNarrowDown, IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowNarrowUp, IconArrowsRightLeft, IconQuestionCircle, IconShare, IconStar } from "@tabler/icons-react";
import imgFooter from '@/assets/footer-payment.png'

import img1 from '@/assets/product_fashion_22_a_1.jpeg'
import img2 from '@/assets/product_fashion_22_a_2.jpeg'
import img3 from '@/assets/product_fashion_22_a_3.jpeg'
import img4 from '@/assets/product_fashion_22_a_4.jpeg'
import img5 from '@/assets/product_fashion_22_b_1.jpeg'
import img6 from '@/assets/product_fashion_22_b_2.jpeg'
import img7 from '@/assets/product_fashion_22_b_3.jpeg'
import img8 from '@/assets/product_fashion_22_b_4.jpeg'
import ProductInfoItems from "@/components/pages/layout/ProductInfoItems";
import SlideRelated from "@/components/pages/layout/SlideRelated";

const imgs = [img1, img2, img3, img4, img5,img6,img7,img8];

type Props = {};

const sizes=["S","M","L"];

const Layout: NextPageWithLayout<Props> = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    const [size,setSize] = useState<String>("")    
    const [count,setCount] = useState<number>(1)

    const handlePlus=()=>{
        setCount(count + 1);
    }

    const handleSubtract=()=>{
        if(count > 0){

            setCount(count -1);
        }
        else{
            setCount(0);            
        }
    }

    return (
        <>
            <PageTop
                title=""
                breadcrumbItems={[
                    {
                        href: ROUTES.HOME,
                        name: 'Home',
                    },
                    {
                        href: ROUTES.LAYOUT,
                        name: 'Linen Check Blazer',
                    },
                ]}
            />
            <Box className="container-app">
                <ProductMainContent container className='product-main-content' sx={{padding:'0'}}>
                    <Grid container item md={6.5} xs={12} className='product-images' >
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
                        {/* {imgs.map((img,index) =>{
                            return <SwiperSlide key={index}>
                            <Box component='div' ><Image height='620' width='480' src={img}  alt=''  style={{ objectFit: 'cover', }}></Image></Box>
                        </SwiperSlide>
                        })} */}

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
                    </Grid>
                    <StyledProductInfo item md={5.5} xs={12} className='product-info' >
                        <Box className='product-title-wrap'>
                            <Typography component='span'>Linen Check Blazer</Typography>

                            

                            <Tooltip title="Add to Wish list" arrow placement="left">
                                <Box>
                                <Button
                                        className="button-wishlist"
                                        typeButton="secondary"
                                    >
                                        <IconStar />
                                    </Button>
                                </Box>
                            </Tooltip>


                        </Box>


                        <Box className='product-rate'>
                            <Box className='product-rate-price'>
                                <Typography className="price">$6.00</Typography>
                                <Typography className="discount">$25.00</Typography>
                            </Box>
                            <Box className='product-rate-review'>
                                <Rating name="read-only" value={5} readOnly sx={{fontSize:'16px'}}/>
                                <Typography component='a'>(1 Review)</Typography>
                            </Box>
                        </Box>

                        <Typography className="product-desc">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati…</Typography>
                        
                        <Box component='div' className="product-add-form">
                            <form className="product-data">
                                <Box component='div' className="product-option">

                                    <Box component='div' className="color">
                                        <StyledAttribute variant='caption' >Color:</StyledAttribute>
                                        <Typography component='span' sx={{fontSize:`${pxToRem(16)}`,color:'#000'}}>abc</Typography>

                                    </Box>
                                    <Box component='div' className="size">

                                        <StyledAttribute  variant="caption">Size:</StyledAttribute>
                                        <Typography component='span' sx={{fontSize:`${pxToRem(16)}`,color:'#000'}}>{size}</Typography>

                                        <Box component='div' className="btn-wrap">
                                            
                                            {sizes.map((type,index)=>{
                                                return (
                                                // <Tooltip arrow key={index} title={type} placement='top'>
                                                //     <Box>
                                                        <Button   key={index}
                                                        className={`button-size  ${size === type ? 'active' : ''}`}
                                                        typeButton="secondary"
                                                        onClick={()=>{
                                                            setSize(type)
                                                        }}
                                                    >
                                                        {type}
                                                    </Button>
                                                //     </Box>
                                                // </Tooltip>
                                                )
                                            })}

                                            
                                        </Box>


                                    </Box>
                                </Box>
                                
                                <Box component='div' className="product-option-bottom">
                                    <Box component='div' className="add-cart">
                                        <Box component='div' className="count">
                                            <Typography component='span' onClick={handleSubtract}>-</Typography>
                                            <Typography component='span'>{count}</Typography>
                                            <Typography component='span' onClick={handlePlus}>+</Typography>
                                        </Box>

                                        <Button
                                            className="button-submit"
                                            typeButton="secondary"
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>

                                    <Box component='div' className="buy-wrap">
                                        <Button className="button-buy" typeButton="primary">Buy It Now</Button>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                        <Box component='div' className="product-social">

                            <Box component='div' className="product-item"> 
                                <IconArrowsRightLeft></IconArrowsRightLeft>
                                <Typography variant="caption">Add to Compare</Typography>
                            </Box>

                            <Box component='div' className="product-item"> 
                                <IconShare ></IconShare> 
                                <Typography variant="caption">Share</Typography>
                            </Box>

                            <Box component='div' className="product-item"> 
                                <IconQuestionCircle></IconQuestionCircle>
                                <Typography variant="caption">Ask a Question</Typography>
                            </Box>
                        </Box>

                        <StyledInfoFooter component='div' >
                            <Image src={imgFooter} alt={""}></Image>
                            <Typography variant="caption">Guarantee safe & secure checkout</Typography>
                        </StyledInfoFooter>
                    </StyledProductInfo>
                </ProductMainContent>
                <Box component='div' className='product-info-detailed' sx={{marginTop:'50px'}}>
                    <ProductInfoItems></ProductInfoItems>
                </Box>
                <Box component='div' className='products-related'>
                    <SlideRelated></SlideRelated>
                </Box>
            </Box>
        </>
    );
};

Layout.getLayout = (page) => {
    return <ClientLayout>{page}</ClientLayout>;
};

const ProductMainContent = styled(Grid)`
    padding: 0px 20px;
    .mySwiper{
        padding-right: ${pxToRem(6)};
        height: 100%;
        overflow: hidden;

        .swiper-slide-thumb-active{
            .gallery-img{
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
            height: 601px;
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
            /* @media ${DEVICE.mobileS} {
                .sliderImg-prev,.sliderImg-next{
                    display: block;
                }
            }

            @media ${DEVICE.tablet} {
                .sliderImg-prev,.sliderImg-next{
                    display: none;
                }
            } */

        }


        
 
`
const StyledProductInfo = styled(Grid)`
    padding-left: ${pxToRem(45)};
    @media ${DEVICE.mobileS}{
                    padding-left:0 ;
    }

    @media ${DEVICE.tablet}{
        padding-left: ${pxToRem(45)};
            }
    .product-title-wrap{
            display: flex;
            justify-content: space-between;
            margin-bottom: ${pxToRem(6)};
            align-items: center;
            span {
                font-size: ${pxToRem(36)};
                color: #000;
            }
            .button-wishlist{
                width: ${pxToRem(45)};
                height: ${pxToRem(45)};
                padding: 0;
                border: 0;
                border-radius: 100%;
                border: 1px solid #ccc;
            }
        }

    .product-rate{
        display: flex;
        align-items: center;
        margin-bottom: ${pxToRem(12)};
        justify-content: space-between;

        .product-rate-price{
            display: flex;
        align-items: center;
        .price{
            font-size: ${pxToRem(24)};
            color: #000;
            font-weight:600;
            margin-right: ${pxToRem(10)};
        }   

        .discount{
            font-size: ${pxToRem(16)};
            color: #ABABAB;
            text-decoration: overline;
        }

        
    }

    .product-rate-review{
            display: flex;
            align-items: center;
            
            a{
                padding: 0;
                border: 0;
                margin: 0 0 0 1rem;
                color: #000;
                font-size: ${pxToRem(14)};
                cursor: pointer;
            }
        }

    }

    .product-desc{
        line-height: 1.75;
        margin-bottom: ${pxToRem(25)};
    }

    .product-add-form{
        


        .btn-wrap{

            display: flex;
            align-items: center;
            margin:${pxToRem(10)} 0 ${pxToRem(25)} 0 ;

            .button-size{
            padding: 0;
            margin: 0;
            width: ${pxToRem(42)};
            height: ${pxToRem(42)};
            margin-right: ${pxToRem(8)};
             }

             .button-size.active{
                color: #fff;
                background-color: #000;
             }

        }

        .add-cart{
            display: flex;
            align-items: center;
            /* justify-content:center; */
            padding-bottom: ${pxToRem(15)};

            .count{
                background-color: #f1f1f1;
                border: 1px solid #f1f1f1;
                border-radius: ${pxToRem(5)};
                display: inline-flex;
                margin-right: ${pxToRem(10)};

                span{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: ${pxToRem(40)};
                    height: ${pxToRem(40)};
                    font-size: ${pxToRem(20)};
                    /* padding: ${pxToRem(5)}; */
                    cursor: pointer;
                }
            }

            .button-submit{
                flex:1;
                padding:${pxToRem(8)} ${pxToRem(32)};
                color: #000;
                font-weight: 600;

                &:hover{
                    color: #fff;
                }
            }
            
        }

        

        .buy-wrap{

            margin: ${pxToRem(20)} 0;
            .button-buy{
            width: 100%;
        }
        }
    }

    .product-social{
        display: flex;
        align-items: center;
        padding-bottom:${pxToRem(10)}} ;
        .product-item{
            display: flex;
            align-items: center;
            margin-right: ${pxToRem(20)};
            cursor: pointer;
            span{
                color: #000;
                font-size: ${pxToRem(16)};
                margin-left: ${pxToRem(6)};
            }

            &:hover span {
                color: #999;
            }
            &:hover {
                color: #999;
            }

        }
    }



`

const StyledAttribute = styled(Typography)`
  
     margin: 0 ${pxToRem(16)} ${pxToRem(8)} 0 ;
     color: #000;
     font-weight: 600;
     font-size: ${pxToRem(16)};

`

const StyledInfoFooter = styled(Box)`
    width: 100%;
    height: ${pxToRem(80)};
    background-color: #f7f7f7;
    margin: ${pxToRem(20)} 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span{
        margin-top: ${pxToRem(10)};
        font-size: ${pxToRem(16)};
        color: #000;
    }
`
export default Layout;
