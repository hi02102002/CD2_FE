import { Box, styled } from '@mui/material';
import { Stack } from '@mui/system';

import { TextLink } from '@/components/common';
import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

type Props = {};

const OrderTable = (props: Props) => {
    return (
        <StyledOrderTable>
            <StyledTHead>
                <StyledTr>
                    <StyedCol component="th" className="id head">
                        Order #
                    </StyedCol>
                    <StyedCol component="th" className="date head">
                        Date
                    </StyedCol>
                    <StyedCol component="th" className="total head">
                        Total
                    </StyedCol>
                    <StyedCol component="th" className="status head">
                        Status
                    </StyedCol>
                    <StyedCol component="th" className="action head">
                        Actions
                    </StyedCol>
                </StyledTr>
            </StyledTHead>
            <StyledTBody>
                <StyledTr>
                    <StyedCol
                        data-title="Order #"
                        component="th"
                        className="id"
                    >
                        1
                    </StyedCol>
                    <StyedCol data-title="Date" component="th" className="date">
                        02/10/2023
                    </StyedCol>
                    <StyedCol
                        data-title="Total"
                        component="th"
                        className="total"
                    >
                        33$
                    </StyedCol>
                    <StyedCol
                        data-title="Status"
                        component="th"
                        className="status"
                    >
                        Pending
                    </StyedCol>
                    <StyedCol
                        data-title="Actions"
                        component="th"
                        className="action"
                    >
                        <Stack>
                            <TextLink href="/account/order/view/1">
                                View order
                            </TextLink>
                        </Stack>
                    </StyedCol>
                </StyledTr>
                <StyledTr>
                    <StyedCol
                        data-title="Order #"
                        component="th"
                        className="id"
                    >
                        1
                    </StyedCol>
                    <StyedCol data-title="Date" component="th" className="date">
                        02/10/2023
                    </StyedCol>
                    <StyedCol
                        data-title="Total"
                        component="th"
                        className="total"
                    >
                        33$
                    </StyedCol>
                    <StyedCol
                        data-title="Status"
                        component="th"
                        className="status"
                    >
                        Pending
                    </StyedCol>
                    <StyedCol
                        data-title="Actions"
                        component="th"
                        className="action"
                    >
                        <TextLink href="/account/order/view/1">
                            View order
                        </TextLink>
                    </StyedCol>
                </StyledTr>
                <StyledTr>
                    <StyedCol
                        data-title="Order #"
                        component="th"
                        className="id"
                    >
                        1
                    </StyedCol>
                    <StyedCol data-title="Date" component="th" className="date">
                        02/10/2023
                    </StyedCol>
                    <StyedCol
                        data-title="Total"
                        component="th"
                        className="total"
                    >
                        33$
                    </StyedCol>
                    <StyedCol
                        data-title="Status"
                        component="th"
                        className="status"
                    >
                        Pending
                    </StyedCol>
                    <StyedCol
                        data-title="Actions"
                        component="th"
                        className="action"
                    >
                        <TextLink href="/account/order/view/1">
                            View order
                        </TextLink>
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
    display: block;
    text-align: start;

    &.head {
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        display: none;
    }

    &:not(&.head)::before {
        content: attr(data-title) ': ';
        font-weight: 600;
        color: ${(p) => p.theme.themeColor.primary};
        margin-right: ${pxToRem(4)};
        display: inline-block;
    }

    @media screen and (${DEVICE.tablet}) {
        display: table-cell;
        &.head {
            display: table-cell;
        }

        &:not(&.head)::before {
            display: none;
        }
    }
`;

export default OrderTable;
