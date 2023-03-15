import { Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '@/components/common';
import { DEVICE } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Category } from '@/types/category';
import { pxToRem } from '@/utils/pxToRem';

import Filter from '../Filter';
import { useFilter } from '../FilterContext';
import Sort, { SortProps } from '../Sort';

type Props = {
    SortProps?: SortProps;
    categories: Category[];
};

const ToolBar = ({ SortProps, categories }: Props) => {
    const { handelClear, options } = useFilter();
    const { isOpen: isOpenFilter, onToggle: onToggleFilter } = useDisclosure();

    const isAllHaveValue = () => {
        return Object.values(options).some((value) => value);
    };

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
                    {isAllHaveValue() && (
                        <StyledButtonFilter
                            onClick={handelClear}
                            typeButton="secondary"
                        >
                            Clear
                        </StyledButtonFilter>
                    )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={6}>
                    <Sort {...SortProps} />
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
                        <Filter categories={categories} />
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

export default ToolBar;
