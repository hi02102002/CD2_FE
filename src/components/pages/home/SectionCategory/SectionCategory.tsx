import { Box, Stack, Typography, styled } from '@mui/material';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import CategoryItem from '../CategoryItem';

type Props = {};

const SectionCategory = (props: Props) => {
    return (
        <StyledSectionCategory className="container-app">
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={20}
            >
                <StyledTitle variant="h3">Section Collection</StyledTitle>
                <Stack direction="row" alignItems="center" spacing={16}>
                    <StyledButtonNavigateSlider component="button">
                        <IconArrowLeft />
                    </StyledButtonNavigateSlider>
                    <StyledButtonNavigateSlider component="button">
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
            >
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryItem />
                </SwiperSlide>
            </Swiper>
        </StyledSectionCategory>
    );
};

const StyledSectionCategory = styled(Box)``;

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

    &:hover svg {
        opacity: 0.7;
    }
`;

export default SectionCategory;
