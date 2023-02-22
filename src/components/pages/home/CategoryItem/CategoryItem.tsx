import Image from 'next/image';
import Link from 'next/link';

import { Box, Stack, Typography, styled } from '@mui/material';
import { IconArrowRight } from '@tabler/icons-react';

import { Button } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const CategoryItem = (props: Props) => {
    return (
        <StyledCategoryItem>
            <Box position="relative">
                <Link href="/category/1">
                    <Box
                        paddingTop={`${1.35227272727 * 100}%`}
                        component="div"
                        className="img-wrap"
                    >
                        <Image
                            src="https://blueskytechmage.com/minimog/media/catalog/category/thumbnail/cat_01.jpg"
                            fill
                            alt="Category item"
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Link>
                <StyledContent>
                    <Stack
                        direction="row"
                        justifyItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Link href="/category/1">
                                <Typography variant="h4" className="name">
                                    Sneakers
                                </Typography>
                            </Link>
                            <Typography component="span" className="amount">
                                8 Items
                            </Typography>
                        </Box>
                        <Link href="/category/1">
                            <Button
                                className="btn-navigate"
                                typeButton="secondary"
                            >
                                <IconArrowRight />
                            </Button>
                        </Link>
                    </Stack>
                </StyledContent>
            </Box>
        </StyledCategoryItem>
    );
};

const StyledCategoryItem = styled(Box)`
    user-select: none;
    overflow: hidden;
    transition: transform 0.64s cubic-bezier(0.15, 0.75, 0.5, 1) 0s;

    .img-wrap {
        transform: scale(1.2);
        transition: transform 0.64s cubic-bezier(0.15, 0.75, 0.5, 1) 0s;
    }

    &:hover {
        transform: scale(1.08);
    }

    &:hover .img-wrap {
        transform: scale(1);
    }
`;

const StyledContent = styled(Box)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${pxToRem(20)} ${pxToRem(30)};
    z-index: 10;

    .name {
        font-size: ${pxToRem(24)};
        font-weight: 400;
    }

    .amount {
        font-size: ${pxToRem(14)};
    }

    button.btn-navigate {
        width: ${pxToRem(45)};
        height: ${pxToRem(45)};
        padding: 0;
        border: 0;
        border-radius: 100%;
    }
`;

export default CategoryItem;
