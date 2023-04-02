import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';



import { ProductItem } from '@/components/client';
import { Button } from '@/components/common';
import { Product } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    relatives: Product[];
};

function SlideRelated({ relatives }: Props) {
    return (
        <StyledSlideRelated>
            <Typography
                variant="body1"
                marginBottom={40}
                fontSize={36}
                textAlign="center"
                color="#000"
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
                {relatives.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductItem product={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button className="slider-next" typeButton="secondary">
                <IconArrowNarrowRight />
            </Button>
        </StyledSlideRelated>
    );
}
const StyledSlideRelated = styled(Box)`
    position: relative;

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
        top: 50%;
        transform: translateY(-50%);
        align-items: center;
        justify-content: center;
    }

    .slider-prev {
        left: -16px;
    }

    .slider-next {
        right: -16px;
    }

    &:hover .slider-prev {
        display: flex;
    }
    &:hover .slider-next {
        display: flex;
    }
`;
export default SlideRelated;