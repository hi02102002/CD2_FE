import { Dispatch, SetStateAction } from 'react';

import { Box, Typography, styled } from '@mui/material';

import { Button } from '@/components/common';
import { OptionSelected } from '@/types/cart';
import { OptionKeyValues } from '@/types/product';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    options: Array<OptionKeyValues>;
    selected: OptionSelected;
    setSelected: Dispatch<SetStateAction<OptionSelected>>;
};

const ChooseOptions = ({ options, selected, setSelected }: Props) => {
    const isSelected = (key: string, value: string) => {
        return selected[key] === value;
    };

    return (
        <StyledOptions component="div">
            {options.map((option) => {
                return (
                    <Box key={option.key}>
                        <StyledAttributeName>{option.key}</StyledAttributeName>
                        <StyledListAttributeValue>
                            {option.values.map((value) => {
                                return (
                                    <StyledAttributeValue
                                        typeButton="secondary"
                                        key={value.name}
                                        className={`${
                                            isSelected(option.key, value.name)
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setSelected({
                                                ...selected,
                                                [option.key]: value.name,
                                            });
                                        }}
                                    >
                                        {value.name}
                                    </StyledAttributeValue>
                                );
                            })}
                        </StyledListAttributeValue>
                    </Box>
                );
            })}
        </StyledOptions>
    );
};

const StyledOptions = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: ${pxToRem(16)};
`;

const StyledAttributeName = styled(Typography)`
    margin: 0 ${pxToRem(16)} ${pxToRem(8)} 0;
    color: ${(p) => p.theme.themeColor.primary};
    font-weight: 600;
    font-size: ${pxToRem(16)};
    text-transform: capitalize;
`;

const StyledListAttributeValue = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: ${pxToRem(8)};
    align-items: center;
`;

const StyledAttributeValue = styled(Button)`
    width: ${pxToRem(42)};
    height: ${pxToRem(42)};
    padding: 0;
    transform: none !important;
    font-size: ${pxToRem(12)};

    &.active {
        box-shadow: 0 0 0 0.1rem ${(p) => p.theme.themeColor.primary};
        background-color: ${(p) => p.theme.themeColor.primary};
        color: #fff;
    }
`;

export default ChooseOptions;
