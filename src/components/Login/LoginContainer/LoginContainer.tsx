import {  Box, Grid, styled, Typography } from "@mui/material"

import { Button } from "@/components/common"
import LoginForm from "../LoginForm"
import { DEVICE } from '@/constants';
import { pxToRem } from "@/utils/pxToRem";
import Link from "next/link";

function LoginContainer(){
    return  <LoginContainerr   >
                    <Box  className="Registered"  >
                        <Typography variant="h5" fontWeight='600' mb='15px' lineHeight='42px' >Registered Customers</Typography>
                        <Text>If you have an account, sign in with your email address.</Text>
                        <LoginForm></LoginForm>
                    </Box>
        
                    <Box  className="Unregistered"  >
                        <Typography variant="h5" fontWeight='600' mb='15px' lineHeight='42px'>Create an Account</Typography>
                        <Text>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</Text>
                        <Link href={"/register"}><Button typeButton="primary" className="btn-create">Create an Account</Button></Link>
                    </Box>
               </LoginContainerr>
        
}

const LoginContainerr = styled('div')`
    max-width: 60rem;
    margin: auto;
    display:flex;
    
    @media ${DEVICE.mobileS} {
           margin: ${pxToRem(15)};
           /* justify-content: center; */
           flex-direction: column;
        }

    @media ${DEVICE.tablet} {
            margin: ${pxToRem(20)};
           /* justify-content: center; */
           flex-direction: row;
        }

        @media ${DEVICE.laptop} {
            margin: auto;
           /* justify-content: center; */
           flex-direction: row;
        }
    .btn-create{
        @media ${DEVICE.mobileS} {
                padding-left: ${pxToRem(2)};
                padding-right: ${pxToRem(2)};
                width: 60%;
        }
        @media ${DEVICE.mobileM} {
                padding-left: ${pxToRem(4)};
                padding-right: ${pxToRem(4)};
                width: 50%;
        }

      
        @media ${DEVICE.tablet} {
                padding-left: ${pxToRem(10.5)};
                padding-right: ${pxToRem(16)};
                width: 60%;
        }
        
    }

    .Registered{
        padding: ${pxToRem(0)} ${pxToRem(48)} ${pxToRem(0)} ${pxToRem(0)};
        margin-bottom: ${pxToRem(48)};

        @media ${DEVICE.mobileS} {
           padding: 0;
           width: 100%;

        }

        @media ${DEVICE.tablet} {
           padding-right: ${pxToRem(48)};
           /* width: 100%; */

        }
    }

    .Unregistered{
        padding: ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(48)};

        @media ${DEVICE.mobileS} {
            padding: 0;
        }

        @media ${DEVICE.tablet} {
           padding-left: ${pxToRem(48)};
           /* width: 100%; */

        }
    }
   

`

const Text = styled('p')`
    letter-spacing: normal;
    font-size: 1rem;
    color: #666666;
    margin-bottom: ${pxToRem(20)};
    line-height: 28px;
`
export default LoginContainer