import { Box, Stack, Typography, styled } from '@mui/material';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DEVICE } from '@/constants';
import { Category } from '@/types/category';
import { pxToRem } from '@/utils/pxToRem';

import CategoryItem from '../CategoryItem';

type Props = {
    categories: Category[];
};

const SectionCategories = ({ categories }: Props) => {
    return (
        <StyledSectionCategories className="container-app">
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={20}
            >
                <StyledTitle variant="h3">Section Collection</StyledTitle>
                <Stack direction="row" alignItems="center" spacing={16}>
                    <StyledButtonNavigateSlider
                        component="button"
                        className="btn-navigation-left"
                    >
                        <IconArrowLeft />
                    </StyledButtonNavigateSlider>
                    <StyledButtonNavigateSlider
                        component="button"
                        className="btn-navigation-right"
                    >
                        <IconArrowRight />
                    </StyledButtonNavigateSlider>
                </Stack>
            </Stack>
            <Swiper
                slidesPerView={1}
                spaceBetween={40}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                navigation={{
                    nextEl: '.btn-navigation-right',
                    prevEl: '.btn-navigation-left',
                }}
                modules={[Navigation]}
            >
                {categories?.map((category) => {
                    return (
                        <SwiperSlide key={category.id}>
                            <CategoryItem category={category} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </StyledSectionCategories>
    );
};

const StyledSectionCategories = styled(Box)`
    margin-bottom: ${pxToRem(50)};

    @media screen and (${DEVICE.tablet}) {
        margin-bottom: ${pxToRem(70)};
    }

    @media screen and (${DEVICE.laptop}) {
        margin-bottom: ${pxToRem(100)};
    }
`;

const StyledTitle = styled(Typography)`
    font-size: ${pxToRem(28)};
    font-weight: 400;

    @media screen and (${DEVICE.tablet}) {
        font-size: ${pxToRem(36)};
    }

    @media screen and (${DEVICE.laptopM}) {
        font-size: ${pxToRem(48)};
    }
`;

const StyledButtonNavigateSlider = styled(Box)`
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: ${({ theme }) => theme.themeColor.primary};
        width: ${pxToRem(20)};
        height: ${pxToRem(20)};
        transition: opacity 0.3s ease;

        @media screen and (${DEVICE.tablet}) {
            width: ${pxToRem(24)};
            height: ${pxToRem(24)};
        }
    }

    &:disabled svg,
    &:hover svg {
        opacity: 0.6;
    }
`;

export default SectionCategories;
