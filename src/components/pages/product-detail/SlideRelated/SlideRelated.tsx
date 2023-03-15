import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductItem } from '@/components/client';
import { Button } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

function SlideRelated() {
    return (
        <StyledSlideRelated>
            <Typography
                variant="body1"
                sx={{
                    textAlign: 'center',
                    fontSize: '36px',
                    color: '#000',
                    marginBottom: '40px',
                }}
            >
                Related Products
            </Typography>
            <Button className="slider-prev" typeButton="secondary">
                <IconArrowNarrowLeft />
            </Button>

            <Swiper
                slidesPerView={4}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={{ nextEl: '.slider-next', prevEl: '.slider-prev' }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem></ProductItem>
                </SwiperSlide>
            </Swiper>
            <Button className="slider-next" typeButton="secondary">
                <IconArrowNarrowRight />
            </Button>
        </StyledSlideRelated>
    );
}
const StyledSlideRelated = styled(Box)`
    position: relative;
    .mySwiper {
        position: relative;
    }
    .slider-prev,
    .slider-next {
        z-index: 999;
        position: absolute;
        display: none;
        width: ${pxToRem(45)};
        height: ${pxToRem(45)};
        padding: 0;
        border: 1px solid #aaa;
        border-radius: 100%;
        background-color: #fff;
        color: #000;
    }

    .slider-prev {
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
    }

    .slider-next {
        top: 50%;
        right: -16px;
        transform: translateY(-50%);
    }

    &:hover .slider-prev {
        display: block;
    }
    &:hover .slider-next {
        display: block;
    }
`;
export default SlideRelated;
