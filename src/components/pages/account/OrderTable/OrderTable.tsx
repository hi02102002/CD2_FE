import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Alert, Box, CircularProgress, Stack, styled } from '@mui/material';
import { toast } from 'react-hot-toast';

import { LoadingFullPage, TextHover, TextLink } from '@/components/common';
import { DEVICE, ROUTES } from '@/constants';
import orderService from '@/services/order.service';
import { Order, OrderStatus } from '@/types/order';
import { formatCurrency } from '@/utils/formatCurrency';
import { pxToRem } from '@/utils/pxToRem';

const OrderTable = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoadingCancel, setIsLoadingCancel] = useState<boolean>(false);

    const handelUpdateStatusOrder = async (
        orderId: number,
        status: Order['status'],
    ) => {
        try {
            setIsLoadingCancel(true);
            await orderService.updateStatus(orderId, status);
            setOrders((prev) => {
                return prev.map((order) => {
                    if (order.orderId === orderId) {
                        return {
                            ...order,
                            status,
                        };
                    }
                    return order;
                });
            });
            setIsLoadingCancel(false);
            switch (status) {
                case OrderStatus.Cancel:
                    toast.success('Cancel order successfully');
                    break;
                case OrderStatus.Received:
                    toast.success('Received order successfully');
            }
        } catch (error: any) {
            setIsLoadingCancel(false);
            switch (status) {
                case OrderStatus.Cancel:
                    toast.error(
                        error?.response?.data?.message || 'Cancel order failed',
                    );
                    break;
                case OrderStatus.Received:
                    toast.error(
                        error?.response?.data?.message ||
                            'Received order failed',
                    );
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await orderService.getOrdersUser();
                console.log(res);
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            {isLoadingCancel && <LoadingFullPage />}
            {loading ? (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                >
                    <CircularProgress size={24} />
                </Box>
            ) : orders.length > 0 ? (
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
                        {orders.map((order) => (
                            <Row
                                key={order.orderId}
                                order={order}
                                onChangeStatus={handelUpdateStatusOrder}
                            />
                        ))}
                    </StyledTBody>
                </StyledOrderTable>
            ) : (
                <Alert
                    severity="warning"
                    sx={{
                        width: '100%',
                        alignSelf: 'start',
                    }}
                >
                    You have no orders yet.{' '}
                </Alert>
            )}
        </>
    );
};

type RowProps = {
    order: Order;
    onChangeStatus: (orderId: number, status: Order['status']) => void;
};

const Row = ({ order, onChangeStatus }: RowProps) => {
    const router = useRouter();

    return (
        <StyledTr>
            <StyedCol data-title="Order #" component="th" className="id">
                {order.orderId}
            </StyedCol>
            <StyedCol data-title="Date" component="th" className="date">
                {new Date(order.createdDate || Date.now()).toLocaleDateString(
                    'en-US',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    },
                )}
            </StyedCol>
            <StyedCol data-title="Total" component="th" className="total">
                {formatCurrency(order.totalPrice)}
            </StyedCol>
            <StyedCol data-title="Status" component="th" className="status">
                {order.status.toUpperCase()}
            </StyedCol>
            <StyedCol data-title="Actions" component="th" className="action">
                <Stack direction="row" gap={16}>
                    <TextLink href={`${ROUTES.ACCOUNT_ORDER}/${order.orderId}`}>
                        View order
                    </TextLink>
                    {(order.status === OrderStatus.Pending ||
                        order.status === OrderStatus.Success) && (
                        <TextHover
                            sx={{
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                                onChangeStatus(
                                    order.orderId,
                                    OrderStatus.Cancel,
                                )
                            }
                        >
                            Cancel
                        </TextHover>
                    )}
                    {order.status === OrderStatus.Delivering && (
                        <TextHover
                            sx={{
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                                onChangeStatus(
                                    order.orderId,
                                    OrderStatus.Received,
                                )
                            }
                        >
                            Received
                        </TextHover>
                    )}
                    {order.status === OrderStatus.Received && (
                        <TextHover
                            sx={{
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                router.push(ROUTES.ACCOUNT_PRODUCT_REVIEW);
                            }}
                        >
                            Rate
                        </TextHover>
                    )}
                </Stack>
            </StyedCol>
        </StyledTr>
    );
};

const StyledOrderTable = styled('table')`
    width: 100%;
    height: 100%;
`;

const StyledTHead = styled('thead')``;

const StyledTBody = styled('tbody')`
    width: 100%;
`;

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
