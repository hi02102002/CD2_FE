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
    value: {
        [key: string]: any;
    };
};

const OPTIONS_SORT: Array<Option> = [
    {
        id: uuid(),
        name: 'Name: A -> Z',
        value: {
            name: 'name',
            asc: true,
        },
    },
    {
        id: uuid(),
        name: 'Name: Z -> A',
        value: {
            name: 'name',
            asc: false,
        },
    },
    {
        id: uuid(),
        name: 'Price: Low to high',
        value: {
            name: 'price',
            asc: true,
        },
    },
    {
        id: uuid(),
        name: 'Price: High to low',
        value: {
            name: 'price',
            asc: false,
        },
    },

    {
        id: uuid(),
        name: 'Latest',
        value: {
            name: 'createdDate',
            asc: true,
        },
    },
    {
        id: uuid(),
        name: 'Oldest',
        value: {
            name: 'createdDate',
            asc: false,
        },
    },
    {
        id: uuid(),
        name: 'Avg rating',
        value: {
            name: 'avgRating',
            asc: false,
        },
    },
];

const Sort = ({ onSort }: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { handelFilter, options } = useFilter();
    const [selected, setSelected] = useState<Option>(
        OPTIONS_SORT.find((option) => {
            if (option.value.name === 'Latest' && option.value.asc === true) {
                return true;
            }
            if (option.value.name === 'Oldest' && option.value.asc === false) {
                return true;
            }
            return option.value.name === options.sortBy;
        }) || OPTIONS_SORT[0],
    );
    const open = Boolean(anchorEl);

    const handleSelectOption = (option: Option) => {
        if (!(option.id === selected.id)) {
            setSelected(option);
            handelFilter({
                sortBy: option.value.name,
                asc: option.value.asc,
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
                                    option.name === selected.name
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
