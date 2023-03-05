import React from 'react';

import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    StackProps,
    Typography,
    styled,
} from '@mui/material';
import { common } from '@mui/material/colors';
import { IconX } from '@tabler/icons-react';

import { pxToRem } from '@/utils/pxToRem';

type ModalWrapperProps = {} & BoxProps;

type HeaderProps = {
    titleText: string;
    onClose?: () => void;
} & StackProps;

type FooterProps = {
    ButtonOkProps?: ButtonProps;
    ButtonCancelProps?: ButtonProps;
    textCancel?: string;
    textOke?: string;
} & BoxProps;

const Header: React.FC<HeaderProps> = ({ titleText, onClose, ...props }) => {
    return (
        <StyledHeader {...props}>
            <Typography className="title" variant="h4">
                {titleText}
            </Typography>
            <Box component="div" className="btn-close" onClick={onClose}>
                <IconX />
            </Box>
        </StyledHeader>
    );
};

const Footer: React.FC<FooterProps> = ({
    ButtonCancelProps,
    ButtonOkProps,
    textCancel = 'Cancel',
    textOke = 'Ok',
    ...props
}) => {
    return (
        <StyledFooter {...props}>
            <Button variant="outlined" {...ButtonCancelProps}>
                {textCancel}
            </Button>
            <Button variant="contained" {...ButtonOkProps}>
                {textOke}
            </Button>
        </StyledFooter>
    );
};

const ModalWrapper: React.FC<ModalWrapperProps> & {
    Header: React.FC<HeaderProps>;
    Footer: React.FC<FooterProps>;
} = ({ children, ...props }) => {
    return <StyledModalWrapper {...props}>{children}</StyledModalWrapper>;
};

ModalWrapper.Header = Header;
ModalWrapper.Footer = Footer;

const StyledModalWrapper = styled(Box)`
    max-width: ${pxToRem(500)};
    background-color: ${common.white};
    border-radius: 4px;
    width: 100%;
`;

const StyledHeader = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${pxToRem(16)};
    padding: ${pxToRem(16)};

    .btn-close {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

const StyledFooter = styled(Box)`
    padding: ${pxToRem(16)};
    display: flex;
    align-items: center;
    gap: ${pxToRem(16)};
    justify-content: flex-end;
`;

export default ModalWrapper;
