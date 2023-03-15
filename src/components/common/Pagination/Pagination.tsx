import {
    Pagination as MuiPagination,
    PaginationItem,
    PaginationItemProps,
    PaginationProps,
    css,
    styled,
    useMediaQuery,
} from '@mui/material';
import { common } from '@mui/material/colors';

import { DEVICE } from '@/constants';

type Props = {
    PaginationItemProps?: PaginationItemProps;
} & PaginationProps;

const Pagination = ({ PaginationItemProps, ...props }: Props) => {
    const isMobileL = useMediaQuery(DEVICE.mobileL);

    return (
        <MuiPagination
            {...props}
            renderItem={(item) => {
                return (
                    <StyledPaginationItem
                        {...PaginationItemProps}
                        {...item}
                        size={isMobileL ? 'medium' : 'small'}
                    />
                );
            }}
        />
    );
};

const StyledPaginationItem = styled(PaginationItem)`
    color: ${({ theme }) => theme.themeColor.primary};
    font-weight: 500;
    ${({ selected, theme }) =>
        selected
            ? css`
                  background-color: ${theme.themeColor.primary} !important;
                  color: ${common.white};
              `
            : undefined};
`;

export default Pagination;
