import Image, { StaticImageData } from 'next/image';

import { Box, Typography, styled } from '@mui/material';
import { common } from '@mui/material/colors';
import { Variants, motion } from 'framer-motion';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/common';
import { DEVICE } from '@/constants';
import authService from '@/services/auth.service';
import useAuthStore from '@/store/auth';
import { pxToRem } from '@/utils/pxToRem';

type Slide = {
    id: string;
    image: string | StaticImageData;
    text: string;
};

const SLIDE_SHOWS: Array<Slide> = [
    {
        id: '1',
        image: '/h1_slide_01.jpg',
        text: 'Double Breasted',
    },
    {
        id: '2',
        image: '/h1_slide_02.jpg',
        text: 'Venice Haute Counture',
    },
    {
        id: '3',
        image: '/h1_slide_03.jpg',
        text: 'Autumn Collection',
    },
];

const textContentVariant: Variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const textContentItemVariant = (startY: number, endY: number): Variants => {
    return {
        hidden: {
            opacity: 0,
            y: startY,
        },
        show: {
            opacity: 1,
            y: endY,
            transition: {
                duration: 1,
            },
        },
    };
};

const Banner = () => {
    const { setAuth } = useAuthStore();

    return (
        <StyledBanner>
            <Box position="relative">
                <StyledSwiper
                    spaceBetween={30}
                    effect={'fade'}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, EffectFade, Pagination]}
                    autoplay={{
                        delay: 1000000,
                        disableOnInteraction: false,
                    }}
                    loop
                >
                    {SLIDE_SHOWS.map((el) => {
                        return (
                            <SwiperSlide key={el.id}>
                                {({ isActive }) => (
                                    <>
                                        <StyledImageWrapper>
                                            <Image
                                                src={el.image}
                                                alt={el.text}
                                                fill
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                                draggable={false}
                                            />
                                        </StyledImageWrapper>
                                        <div className="container-app">
                                            {isActive && (
                                                <StyledTextContent
                                                    variants={
                                                        textContentVariant
                                                    }
                                                    initial="hidden"
                                                    animate="show"
                                                >
                                                    <StyledSubTitle
                                                        variants={textContentItemVariant(
                                                            50,
                                                            0,
                                                        )}
                                                    >
                                                        New Arrivals
                                                    </StyledSubTitle>
                                                    <StyledTitle
                                                        variants={textContentItemVariant(
                                                            100,
                                                            0,
                                                        )}
                                                        variant="h1"
                                                    >
                                                        {el.text}
                                                    </StyledTitle>
                                                    <motion.div
                                                        variants={textContentItemVariant(
                                                            150,
                                                            0,
                                                        )}
                                                    >
                                                        <Button
                                                            typeButton="secondary"
                                                            className="btn-shop"
                                                            onClick={() => {
                                                                setAuth({
                                                                    accessToken:
                                                                        null,
                                                                    user: null,
                                                                });
                                                                authService.logout();
                                                            }}
                                                        >
                                                            Shop Now
                                                        </Button>
                                                    </motion.div>
                                                </StyledTextContent>
                                            )}
                                        </div>
                                    </>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </StyledSwiper>
            </Box>
        </StyledBanner>
    );
};

const StyledBanner = styled(Box)`
    overflow: hidden;
    user-select: none;
    margin-bottom: ${pxToRem(50)};

    @media screen and (${DEVICE.tablet}) {
        margin-bottom: ${pxToRem(70)};
    }

    @media screen and (${DEVICE.laptop}) {
        margin-bottom: ${pxToRem(100)};
    }
`;

const StyledSwiper = styled(Swiper)`
    .swiper-pagination {
        right: 16px;
        left: unset !important;
        bottom: unset !important;
        top: 50% !important;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
        gap: ${pxToRem(8)};
        width: unset !important;
    }

    .swiper-pagination-bullet {
        background-color: ${common.black};
        opacity: 1;
        transition: transform 0.3s ease;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: ${common.white};
        border: 1px solid ${common.black};
        transform: scale(1.5);
    }
`;

const StyledTextContent = styled(motion(Box))`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(8)};

    button.btn-shop {
        background-color: transparent;
        height: ${pxToRem(42)};
        padding: 0 ${pxToRem(16)};
        font-size: ${pxToRem(14)};
    }
`;

const StyledImageWrapper = styled(Box)`
    position: relative;
    padding-top: 75%;
    width: 100%;

    @media screen and (${DEVICE.tablet}) {
        padding-top: 55%;
    }

    @media screen and (${DEVICE.laptop}) {
        padding-top: ${(85 * 100) / 192}%;
    }
`;

const StyledSubTitle = styled(motion(Typography))`
    font-size: ${pxToRem(12)};
    font-weight: 500;
    color: ${common.black};

    @media screen and (${DEVICE.tablet}) {
        font-size: ${pxToRem(14)};
    }
`;

const StyledTitle = styled(motion(Typography))`
    font-weight: 500;
    font-size: ${pxToRem(40)};
    max-width: ${pxToRem(240)};

    @media screen and (${DEVICE.tablet}) {
        font-size: ${pxToRem(56)};
        max-width: ${pxToRem(450)};
    }
`;

export default Banner;
