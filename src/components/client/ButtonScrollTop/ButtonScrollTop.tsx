import { useEffect } from 'react';

import { styled } from '@mui/material';
import { IconChevronUp } from '@tabler/icons-react';

import { Button } from '@/components/common';
import { useDisclosure } from '@/hooks/useDisclosure';
import { pxToRem } from '@/utils/pxToRem';

const ButtonScrollTop = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        const handelScroll = () => {
            if (window.scrollY > 100) {
                onOpen();
            } else {
                onClose();
            }
        };

        handelScroll();
        window.addEventListener('scroll', handelScroll);

        return () => {
            window.removeEventListener('scroll', handelScroll);
        };
    }, [onOpen, onClose]);

    return (
        <StyledButtonScrollTop
            onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }}
            sx={{
                bottom: isOpen ? 16 : -100,
            }}
            title="Move to top"
        >
            <IconChevronUp />
        </StyledButtonScrollTop>
    );
};

const StyledButtonScrollTop = styled(Button)`
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 1000;
    width: ${pxToRem(42)};
    height: ${pxToRem(42)};
    border-radius: 100%;
    padding: 0;
`;

export default ButtonScrollTop;
