import { Menu, MenuItem, styled } from '@mui/material';

import { pxToRem } from '@/utils/pxToRem';

export const StyledMenu = styled(Menu)`
    .MuiPaper-root {
        border-radius: 4px;
        box-shadow: 0px 0px 30px 0px rgb(0 0 0 / 6%);
    }
`;

export const StyledMenuItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: ${pxToRem(16)};
`;
