import { Box, Typography } from '@mui/material';

interface Props {
    title: string;
    children: React.ReactNode;
    className?: string;
}

function DetailTabItem({ title, children, className }: Props) {
    return (
        <Box component="div" width="25%" className={className}>
            <Typography variant="h4" fontWeight={400} marginBottom={15}>
                {title}
            </Typography>
            {children}
        </Box>
    );
}

export default DetailTabItem;
