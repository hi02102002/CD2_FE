import {  Grid, styled, Typography } from "@mui/material"

import { Button } from "@/components/common"
import LoginForm from "../LoginForm"
// import { DEVICE } from '@/constants';

function LoginContainer(){
    return <LoginContainerL>
               <Grid container >
                    <Grid item className="Registered" sm={12} md={6} sx={{padding:'0 48px 0 0',mb:'48px'}}>
                        <Typography variant="h5" fontWeight='600' mb='15px' lineHeight='42px' >Registered Customers</Typography>
                        <Text>If you have an account, sign in with your email address.</Text>
                        <LoginForm></LoginForm>
                    </Grid>
        
                    <Grid item className="Unregistered" sm={12} md={6} sx={{padding:'0 0 0 48px'}}>
                        <Typography variant="h5" fontWeight='600' mb='15px' lineHeight='42px'>Create an Account</Typography>
                        <Text>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</Text>
                        <Button typeButton="primary" className="btn-create">Create an Account</Button>
                    </Grid>
               </Grid>
        </LoginContainerL>
}

const LoginContainerL = styled('div')`
    max-width: 60rem;
    margin: auto;


    .btn-create{
        width: 50%;
    }

   

`

const Text = styled('p')`
    letter-spacing: normal;
    font-size: 1rem;
    color: #666666;
    margin-bottom: 20px;
    line-height: 28px;
`
export default LoginContainer