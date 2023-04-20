import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Input,
    Stack,
    TablePagination,
    TablePaginationProps,
    Typography,
    styled,
} from '@mui/material';
import { common } from '@mui/material/colors';
import { DataGridProps } from '@mui/x-data-grid';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import Table from '../Table';

type Props = {
    TableProps: DataGridProps;
    ButtonAddProps?: {
        textButton?: string;
    } & ButtonProps;
    SearchProps?: {
        onSearch: () => void;
        onClearSearch: () => void;
        placeholder?: string;
        textButtonSearch?: string;
        nameInput?: string;
        sx?: ButtonProps['sx'];
        onChange: (value: string) => void;
        value: string;
    };
    TablePaginationProps?: TablePaginationProps;
    RemoveProps?: {
        rowSelected: any[];
        ButtonRemoveProps?: LoadingButtonProps;
    };
    showTop?: boolean;
};

const MainContent = ({
    ButtonAddProps,
    SearchProps,
    TableProps,
    TablePaginationProps,
    RemoveProps,
    showTop = true,
}: Props) => {
    return (
        <StyledMainContent>
            {showTop && (
                <StyledMainContentHeader>
                    <Box
                        component="div"
                        className="search-container"
                        sx={{
                            ...SearchProps?.sx,
                        }}
                    >
                        <Input
                            placeholder={SearchProps?.placeholder || 'Search'}
                            name={SearchProps?.nameInput || 'name'}
                            onChange={(e) =>
                                SearchProps?.onChange(e.target.value)
                            }
                            value={SearchProps?.value}
                        />
                        <Button
                            sx={{
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                SearchProps?.onClearSearch?.();
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                SearchProps?.onSearch?.();
                            }}
                        >
                            {SearchProps?.textButtonSearch || 'Search'}
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        className="button-add"
                        sx={{
                            textTransform: 'none',
                        }}
                        {...ButtonAddProps}
                    >
                        {ButtonAddProps?.textButton || 'Add'}
                    </Button>
                </StyledMainContentHeader>
            )}
            <Table {...TableProps} hideFooter />
            <Stack
                direction="row"
                sx={{ background: '#fff' }}
                px={16}
                justifyContent="space-between"
            >
                {RemoveProps?.rowSelected && (
                    <Stack direction="row" alignItems="center" gap={16}>
                        {RemoveProps.rowSelected.length > 0 && (
                            <>
                                <Typography>
                                    {RemoveProps?.rowSelected.length} rows
                                    Selected
                                </Typography>
                                <LoadingButton
                                    {...RemoveProps?.ButtonRemoveProps}
                                    variant="contained"
                                >
                                    Remove
                                </LoadingButton>
                            </>
                        )}
                    </Stack>
                )}
                {TablePaginationProps && (
                    <TablePagination
                        {...TablePaginationProps}
                        sx={{
                            ...TablePaginationProps?.sx,
                            marginLeft: 'auto',
                        }}
                    />
                )}
            </Stack>
        </StyledMainContent>
    );
};

const StyledMainContent = styled(Box)<BoxProps>`
    border-radius: ${pxToRem(4)};
    overflow: hidden;

    & .MuiDataGrid-footerContainer {
        border-radius: 0 0 4px 4px;
    }
`;

const StyledMainContentHeader = styled(Box)<BoxProps>`
    min-height: ${pxToRem(56)};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: ${common.white};
    padding: ${pxToRem(16)} ${pxToRem(16)};
    gap: ${pxToRem(16)};

    .search-container {
        display: flex;
        align-items: center;
        gap: ${pxToRem(16)};
        width: 100%;

        .MuiInputBase-root {
            width: 100%;
        }

        @media ${DEVICE.tablet} {
            width: unset;
        }
    }

    .button-add {
        width: 100%;

        @media ${DEVICE.tablet} {
            width: unset;
        }
    }

    @media ${DEVICE.tablet} {
        flex-direction: row;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

export default MainContent;
