import styled from "@emotion/styled"
import { Box, Checkbox, FormControl, FormControlLabel, TextField, Typography } from "@mui/material"
import ButtonLogIn from "../../common/ButtonLogIn"


function LoginFrom(){
    return <Box component='div'>
    <FormControl sx={{width:'100%'}}><TextFieldL id="outlined-basic" label="Email *" variant="outlined" fullWidth  /></FormControl>
    <FormControl sx={{width:'100%'}}><TextFieldL id="outlined-basic" label="Password *" variant="outlined" fullWidth /></FormControl>
    <FormControlLabel control={<Checkbox/>} sx={{mb:'20px'}} label='Show Password'></FormControlLabel>
    <ButtonLogIn content="Sign In" width="lg"></ButtonLogIn>
    <Box component={'div'} sx={{display:'flex',justifyContent:'space-between',mt:'10px'}}>
        <Typography variant="body1" sx={{font:'0.8rem',color:'#e22b2e'}}>* Required Fields</Typography>
        <SpanText>Forgot Your Password?</SpanText>
    </Box>
    </Box>
}

const TextFieldL = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
`
const SpanText=styled('span')`
    cursor: pointer;
    &:hover{
        color: #999;
    }
`

export default LoginFrom