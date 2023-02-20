import {
    Tooltip as MTooltip,
    TooltipProps,
    styled,
    tooltipClasses,
} from '@mui/material';
import { common } from '@mui/material/colors';

type Props = {} & TooltipProps;

const Tooltip = ({ children, title, ...rest }: Props) => {
    console.log(tooltipClasses.tooltip);

    return (
        <StyledTooltip title={title} {...rest}>
            {children}
        </StyledTooltip>
    );
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <MTooltip {...props} classes={{ popper: className }} />
))((p) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: common.black,
        color: common.white,
        fontSize: 14,
        boxShadow: '4px 4px 8px rgb(0 0 0 / 30%)',
    },
}));

export default Tooltip;
