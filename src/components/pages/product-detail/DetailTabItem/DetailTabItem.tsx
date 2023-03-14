import { Box, Typography } from "@mui/material"

interface Props {
    title:string,
    children: React.ReactNode,
    classname:string,
}

function DetailTabItem({title, children,classname}:Props){

    return <Box component='div' sx={{width:'25%'}} className={classname}>
        <Typography variant="h4" sx={{fontWeight:'400',margin:'10px 0 15px 0'}}>{title}</Typography>
        {children}
    </Box>
}

export default DetailTabItem