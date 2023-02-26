import { Stack, Typography, styled } from '@mui/material';
import { common, grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Tooltip } from '@/components/common';
import { DEVICE } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { pxToRem } from '@/utils/pxToRem';

import Filter from '../Filter';
import Sort, { SortProps } from '../Sort';

type Props = {
    listGridMode: Array<2 | 3 | 4 | 5>;
    onChooseMode: (mode: 2 | 3 | 4 | 5) => void;
    chooseMode: number;
    SortProps?: SortProps;
};

const ToolBar = ({
    chooseMode,
    listGridMode,
    onChooseMode,
    SortProps,
}: Props) => {
    const { isOpen: isOpenFilter, onToggle: onToggleFilter } = useDisclosure();

    return (
        <>
            <StyledToolbar>
                <Stack direction="row" gap={6} alignItems="center">
                    <StyledButtonFilter
                        sx={{
                            height: 34,
                        }}
                        onClick={onToggleFilter}
                        typeButton="secondary"
                    >
                        {isOpenFilter ? 'Close Filter' : 'Open Filter'}
                    </StyledButtonFilter>
                    <Typography>Items 1-12 of 30</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={6}>
                    <Sort {...SortProps} />
                    <Stack direction="row" spacing={6} alignItems="center">
                        {listGridMode.map((item) => {
                            return (
                                <Tooltip
                                    key={item}
                                    title={`${item} column`}
                                    arrow
                                    placement="top"
                                >
                                    <Box>
                                        <StyledButtonGridMode
                                            onClick={() => {
                                                onChooseMode(item);
                                            }}
                                            typeButton="secondary"
                                            sx={{
                                                backgroundColor: ({
                                                    themeColor,
                                                }) =>
                                                    chooseMode === item
                                                        ? `${themeColor.primary} !important`
                                                        : undefined,
                                                color:
                                                    chooseMode === item
                                                        ? `${common.white} !important`
                                                        : undefined,
                                            }}
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    {item === 4 && (
                                                        <>
                                                            <rect
                                                                x="2.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="6.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="10.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="14.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                        </>
                                                    )}
                                                    {item === 3 && (
                                                        <>
                                                            <rect
                                                                x="4.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="8.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="12.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                        </>
                                                    )}
                                                    {item === 2 && (
                                                        <>
                                                            <rect
                                                                x="6.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                            <rect
                                                                x="10.25"
                                                                y="2.75"
                                                                width="1.5"
                                                                height="12.5"
                                                                rx="0.75"
                                                                fill="currentColor"
                                                            ></rect>
                                                        </>
                                                    )}
                                                </svg>
                                            </svg>
                                        </StyledButtonGridMode>
                                    </Box>
                                </Tooltip>
                            );
                        })}
                    </Stack>
                </Stack>
            </StyledToolbar>
            <AnimatePresence>
                {isOpenFilter && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                    >
                        <Filter />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const StyledToolbar = styled(Stack)`
    align-items: center;
    justify-content: space-between;
    flex-direction: column-reverse;
    gap: ${pxToRem(16)};

    @media screen and (${DEVICE.tablet}) {
        flex-direction: row;
    }
`;

const StyledButtonFilter = styled(Button)`
    border: 0 !important;
    height: ${pxToRem(34)};
    user-select: none;
    &.secondary {
        background-color: ${grey[100]};
    }

    &.secondary:hover {
        box-shadow: none !important;
        background-color: ${grey[100]};
        color: ${({ theme }) => theme.themeColor.primary};
    }

    &:active {
        transform: none;
    }
`;

const StyledButtonGridMode = styled(Button)`
    width: ${pxToRem(34)};
    height: ${pxToRem(34)};
    border: 0 !important;
    padding: 0;
    &.secondary {
        background-color: ${grey[100]};
    }

    &:hover {
        box-shadow: none !important;
    }

    &:active {
        transform: none;
    }
    svg {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default ToolBar;
