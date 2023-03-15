import { BadgeProps, Badge as MBadge, styled } from '@mui/material';
import { common, red } from '@mui/material/colors';

import { pxToRem } from '@/utils/pxToRem';

const Badge = (props: BadgeProps) => {
    return (
        <StyledBadge {...props} showZero>
            {props.children}
        </StyledBadge>
    );
};

const StyledBadge = styled(MBadge)<BadgeProps>`
    .MuiBadge-badge {
        width: ${pxToRem(22)};
        height: ${pxToRem(22)};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: 600;
        background-color: ${red[500]};
        color: ${common.white};
        padding: 0;
    }
`;

export default Badge;
