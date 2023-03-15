import React, { useState } from 'react';



import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { v4 as uuid } from 'uuid';

import { Button, Menu, MenuItem } from '@/components/common';
import { pxToRem } from '@/utils/pxToRem';

import { useFilter } from '../FilterContext';

export type Props = {
    onSort?: (option: Option) => void;
};

export type Option = {
    id: string;
    name: string;
    value: string;
};

const OPTIONS_SORT: Array<Option> = [
    {
        id: uuid(),
        name: 'Name: A -> Z',
        value: 'name-asc',
    },
    {
        id: uuid(),
        name: 'Name: Z -> A',
        value: 'name-desc',
    },
    {
        id: uuid(),
        name: 'Price: Low to high',
        value: 'price-asc',
    },
    {
        id: uuid(),
        name: 'Price: High to low',
        value: 'price-desc',
    },

    {
        id: uuid(),
        name: 'Latest',
        value: 'lasted',
    },
    {
        id: uuid(),
        name: 'Oldest',
        value: 'oldest',
    },
    {
        id: uuid(),
        name: 'Avg rating',
        value: 'ratting',
    },
];

const Sort = ({ onSort }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { handelFilter, options } = useFilter();
    const [selected, setSelected] = useState<Option>(
        OPTIONS_SORT.find((option) => option.value === options.sort) ||
            OPTIONS_SORT[0],
    );
    const open = Boolean(anchorEl);

    const handleSelectOption = (option: Option) => {
        if (!(option.id === selected.id)) {
            setSelected(option);
            handelFilter({
                sort: option.value,
            });
            onSort?.(option);
            setAnchorEl(null);
        }
        setAnchorEl(null);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box>
            <StyledButtonSelected
                onClick={handleOpenMenu}
                typeButton="secondary"
            >
                {selected.name}
            </StyledButtonSelected>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {OPTIONS_SORT.map((option) => {
                    return (
                        <MenuItem
                            key={option.id}
                            onClick={() => {
                                handleSelectOption(option);
                            }}
                            disableRipple
                            sx={{
                                backgroundColor:
                                    option.value === options.sort
                                        ? grey[100]
                                        : undefined,
                            }}
                        >
                            {option.name}
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
};

const StyledButtonSelected = styled(Button)`
    border: 0 !important;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    font-weight: 600;
    padding: ${pxToRem(8)};
    height: ${pxToRem(34)};
    min-width: ${pxToRem(150)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &.secondary {
        background-color: ${grey[100]};
    }

    &:hover {
        box-shadow: none !important;
    }

    &:active {
        transform: none;
    }
`;

export default Sort;