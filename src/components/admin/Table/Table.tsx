import { Box } from '@mui/material';
import { common } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';

type Props = {} & DataGridProps;

const Table = (props: Props) => {
    return (
        <Box
            component="div"
            sx={{
                backgroundColor: common.white,
                width: '100%',

                '& .MuiDataGrid-root': {
                    borderRadius: 0,
                },
                '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
                    outline: 'none !important',
                },
                '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus':
                    {
                        outline: 'none !important',
                    },
            }}
        >
            <DataGrid
                autoHeight
                localeText={{
                    noRowsLabel: 'No data',
                }}
                disableExtendRowFullWidth={false}
                {...props}
            />
        </Box>
    );
};

export default Table;
