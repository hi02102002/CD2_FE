import { useState } from 'react';



import Image from 'next/image';



import { Box, Grid, styled } from '@mui/material';
import { IconArrowNarrowDown, IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowNarrowUp } from '@tabler/icons-react';
import TSwiper, { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';



import { Button } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';


type Props = {
    imageURL: string;
};

function ImageLibrary({ imageURL }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);

    const imgs = imageURL.split(',').filter((item) => item !== '');

    const haveThumb = imgs.length > 1;

    return (
        <StyledImageLibrary
            container
            item
            md={6.5}
            xs={12}
            className="product-images"
        >
            {haveThumb && (
                <Grid item md="auto" xs={0} className="left-thumb">
                    <Button className="slider-prev" typeButton="secondary">
                        <IconArrowNarrowUp />
                    </Button>

                    <Swiper
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => {
                            setThumbsSwiper(swiper);
                        }}
                        spaceBetween={1}
                        slidesPerView={6}
                        watchSlidesProgress={true}
                        modules={[Navigation, Thumbs]}
                        className="mySwiper"
                        direction="vertical"
                        navigation={{
                            nextEl: '.slider-next',
                            prevEl: '.slider-prev',
                        }}
                    >
                        {imgs.map((img, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Box
                                        component="div"
                                        className="gallery-img"
                                    >
                                        <Image
                                            width="70"
                                            height="91"
                                            src={img}
                                            alt=""
                                        />
                                    </Box>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <Button className="slider-next" typeButton="secondary">
                        <IconArrowNarrowDown />
                    </Button>
                </Grid>
            )}

            <Grid
                item
                md={haveThumb ? 9.5 : undefined}
                xs={12}
                className="right-thumb"
            >
                <Box position="relative">
                    {haveThumb && (
                        <>
                            <Button
                                className="sliderImg-prev"
                                typeButton="secondary"
                            >
                                <IconArrowNarrowLeft />
                            </Button>
                            <Button
                                className="sliderImg-next"
                                typeButton="secondary"
                            >
                                <IconArrowNarrowRight />
                            </Button>
                        </>
                    )}
                    <Swiper
                        loop={true}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.sliderImg-next',
                            prevEl: '.sliderImg-prev',
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {imgs.map((img, index) => {
                            return (
                                <SwiperSlide key={index}>
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
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Box>
            </Grid>
        </StyledImageLibrary>
    );
}

const StyledImageLibrary = styled(Grid)`
    .mySwiper {
        padding-right: ${pxToRem(6)};
        height: 100%;
        overflow: hidden;

        .swiper-slide-thumb-active {
            .gallery-img {
                /* display: inline-flex; */
                border: 1px solid transparent;
                transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
                border-color: #000;
                cursor: pointer;

                img {
                    transform: scale3d(0.86, 0.9, 0.86);
                    transition: all 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
                }
            }
        }

        .gallery-img {
            border: 1px solid transparent;
            transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
            cursor: pointer;

            &:hover img {
                transform: scale3d(0.86, 0.9, 0.86);
                transition: all 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
            }

            &:hover {
                border-color: #000;
            }
        }

        .swiper-wrapper {
            .swiper-slide {
                width: 100% !important;
                height: 100px !important;
            }
        }
    }
    .left-thumb {
        height: 602px;
        position: relative;
        overflow: hidden;
        .slider-prev,
        .slider-next {
            z-index: 999;
            position: absolute;
            display: none;
            width: ${pxToRem(30)};
            height: ${pxToRem(30)};
            padding: 0;
            border: 0;
            border-radius: 100%;
            align-items: center;
            justify-content: center;
            left: 50%;
            transform: translateX(-50%);
        }

        .slider-prev {
            top: 4px;
        }

        .slider-next {
            bottom: 4px;
        }

        &:hover .slider-prev {
            display: flex;
        }
        &:hover .slider-next {
            display: flex;
        }

        @media ${DEVICE.mobileS} {
            display: none;
        }

        @media ${DEVICE.tablet} {
            display: block;
        }
    }

    .right-thumb {
        .sliderImg-prev,
        .sliderImg-next {
            z-index: 999;
            position: absolute;
            width: ${pxToRem(45)};
            height: ${pxToRem(45)};
            padding: 0;
            border: 0;
            border-radius: 100%;
            align-items: center;
            justify-content: center;
            transform: translateY(-50%);
            top: 50%;
            display: none;

            @media (hover: none) {
                display: none;
            }
        }

        .sliderImg-prev {
            left: ${pxToRem(16)};
        }

        .sliderImg-next {
            right: ${pxToRem(16)};
        }

        &:hover .sliderImg-prev {
            display: flex;
        }
        &:hover .sliderImg-next {
            display: flex;
        }
    }
`;

export default ImageLibrary;