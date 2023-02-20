import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Input,
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
        onSearch?: (valueInput: string) => void;
        placeholder?: string;
        textButtonSearch?: string;
        nameInput?: string;
    };
};

const MainContent = ({ ButtonAddProps, SearchProps, TableProps }: Props) => {
    return (
        <StyledMainContent>
            <StyledMainContentHeader>
                <Box component="div" className="search-container">
                    <Input
                        placeholder={SearchProps?.placeholder || 'Search'}
                        name={SearchProps?.nameInput || 'name'}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                        }}
                        onClick={() => {
                            SearchProps?.onSearch?.('');
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
            <Table {...TableProps} />
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
