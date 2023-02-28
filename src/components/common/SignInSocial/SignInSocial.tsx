import { Box, Button, styled } from '@mui/material';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

interface Props {
    social?: string;
}

function SignInSocial(props: Props) {
    return (
        <StyledButton social={props.social}>
            <Span component="span">
                {' '}
                {props.social === 'facebook' ? (
                    <StyledIconBrandFacebook />
                ) : (
                    <StyledIconBrandGoogle />
                )}
            </Span>
            <SpanI component="span">
                {props.social === 'facebook'
                    ? 'Sign in with Facebook'
                    : 'Sign in with Google'}
            </SpanI>
        </StyledButton>
    );
}

const StyledButton = styled(Button)<Props>`
    background-color: ${(props) =>
        props.social === 'facebook' ? '#3b5998' : '#dd4b39'};
    color: white;
    box-sizing: border-box;
    width: ${pxToRem(215)};
    height: ${pxToRem(34)};
    border: 1px solid transparent;
    justify-content: flex-start;
    padding: 0;
    margin-left: ${pxToRem(6)};

    &:hover {
        background-color: ${(props) =>
            props.social === 'facebook' ? '#2d4373' : '#c23321'};
        border-color: rgba(0, 0, 0, 0.2);
    }

    @media ${DEVICE.mobileS} {
        margin-bottom: ${pxToRem(8)};
    }

    @media ${DEVICE.tablet} {
        margin-bottom: 0;
    }
`;

const Span = styled(Box)`
    width: ${pxToRem(32)};
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 1px;
        height: 100%;
        background-color: black;
        opacity: 0.4;
    }
`;

const StyledIconBrandFacebook = styled(IconBrandFacebook)`
    height: 100%;
    width: ${pxToRem(24)};
    /* fill: white; */
`;

const StyledIconBrandGoogle = styled(IconBrandGoogle)`
    height: 100%;
    width: ${pxToRem(24)};
    fill: #4285f4;
`;

const SpanI = styled(Box)<Props>`
    text-transform: none;
    font-size: ${pxToRem(15)};
    padding-left: ${pxToRem(12)};
`;

export default SignInSocial;
