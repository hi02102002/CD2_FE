import { Box, Rating, Stack, styled } from '@mui/material';

import { TextLimit, TextLink } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const ReivewTable = (props: Props) => {
    return (
        <StyledOrderTable>
            <StyledTHead>
                <StyledTr>
                    <StyedCol component="th" className="created head">
                        Created
                    </StyedCol>
                    <StyedCol component="th" className="name head">
                        Product Name
                    </StyedCol>
                    <StyedCol component="th" className="rating head">
                        Rating
                    </StyedCol>
                    <StyedCol component="th" className="review head">
                        Review
                    </StyedCol>
                </StyledTr>
            </StyledTHead>
            <StyledTBody>
                <StyledTr>
                    <StyedCol
                        data-title="Created"
                        component="th"
                        className="created"
                    >
                        30/02/2023
                    </StyedCol>
                    <StyedCol
                        data-title="Product Name"
                        component="th"
                        className="name"
                    >
                        <Stack direction="row" alignItems="center">
                            <TextLink
                                href={`${ROUTES.PRODUCTS}/1`}
                                limitLine={1}
                            >
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Magni, eligendi!
                            </TextLink>
                        </Stack>
                    </StyedCol>
                    <StyedCol
                        data-title="Rating"
                        component="th"
                        className="total"
                    >
                        <Rating
                            defaultValue={4}
                            max={5}
                            sx={{
                                fontSize: 15,
                                color: (theme) => theme.themeColor.primary,
                            }}
                            readOnly
                        />
                    </StyedCol>
                    <StyedCol
                        data-title="Review"
                        component="th"
                        className="review"
                    >
                        <Stack
                            direction="row"
                            gap={16}
                            rowGap={4}
                            justifyItems="center"
                            flexWrap="wrap"
                        >
                            <TextLimit numLine={2}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Sunt quia ex fuga! In harum
                                ipsa nesciunt voluptates placeat nobis earum ad,
                                incidunt voluptatem velit, obcaecati provident
                                explicabo tenetur cum odio.
                            </TextLimit>
                        </Stack>
                    </StyedCol>
                </StyledTr>
                <StyledTr>
                    <StyedCol
                        data-title="Created"
                        component="th"
                        className="created"
                    >
                        30/02/2023
                    </StyedCol>
                    <StyedCol
                        data-title="Product Name"
                        component="th"
                        className="name"
                    >
                        <Stack direction="row" alignItems="center">
                            <TextLink
                                href={`${ROUTES.PRODUCTS}/1`}
                                limitLine={1}
                            >
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Magni, eligendi!
                            </TextLink>
                        </Stack>
                    </StyedCol>
                    <StyedCol
                        data-title="Rating"
                        component="th"
                        className="total"
                    >
                        <Rating
                            defaultValue={4}
                            max={5}
                            sx={{
                                fontSize: 15,
                                color: (theme) => theme.themeColor.primary,
                            }}
                            readOnly
                        />
                    </StyedCol>
                    <StyedCol
                        data-title="Review"
                        component="th"
                        className="review"
                    >
                        <Stack
                            direction="row"
                            gap={16}
                            rowGap={4}
                            justifyItems="center"
                            flexWrap="wrap"
                        >
                            <TextLimit numLine={2}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Sunt quia ex fuga! In harum
                                ipsa nesciunt voluptates placeat nobis earum ad,
                                incidunt voluptatem velit, obcaecati provident
                                explicabo tenetur cum odio.
                            </TextLimit>
                        </Stack>
                    </StyedCol>
                </StyledTr>
            </StyledTBody>
        </StyledOrderTable>
    );
};

const StyledOrderTable = styled('table')`
    width: 100%;
    height: 100%;
`;

const StyledTHead = styled('thead')``;

const StyledTBody = styled('tbody')``;

const StyledTr = styled('tr')``;

const StyedCol = styled(Box)`
    padding: ${pxToRem(10)} ${pxToRem(15)};
    width: auto;
    border: 1px solid ${(p) => p.theme.themeColor.border};
    text-align: start;
    display: block;

    &.head {
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        display: none;
    }

    &.review {
        width: 100%;
    }

    &:not(&.head)::before {
        content: attr(data-title) ': ';
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        margin-right: ${pxToRem(4)};
        display: inline-block;
        margin-bottom: ${pxToRem(4)};
    }

    @media screen and (${DEVICE.laptop}) {
        display: table-cell;
        &.head {
            display: table-cell;
        }

        &:not(&.head)::before {
            display: none;
        }

        &.review {
            width: 30%;
        }
    }
`;

export default ReivewTable;
