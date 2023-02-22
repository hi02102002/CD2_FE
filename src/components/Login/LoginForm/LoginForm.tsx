import styled from "@emotion/styled"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from "@/components/common"
import Input from "@/components/common/Input"


interface IFormInputs {
    email:string;
    password:string;
}

const SignupSChema=yup.object().shape({
        email:yup.string().required(),
        password:yup.string().required()
    })


function LoginFrom(){
    const {control,handleSubmit,register,formState:{errors}}=useForm<IFormInputs>({resolver:yupResolver(SignupSChema)});

    
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

    return <Boxx component='div'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="email" control={control} defaultValue='' render={({field})=>
                <Input label="Email" nameI="email" register={register} messageError={errors.email?.message} isError={errors.email!=undefined} required sx={{mb:'12px'}} {...field} ></Input>  
            }></Controller>
               
            <Controller name="password" control={control} defaultValue='' render={({field})=>
                 <Input label="Password" nameI="password" register={register} messageError={errors.password?.message} isError={errors.password!=undefined} required {...field} type='password'></Input>
            }></Controller>
           
    
        <FormControlLabel control={<Checkbox/>} sx={{mb:'20px'}} label='Show Password'></FormControlLabel>
    
        <Button typeButton="primary" className="btn-signin" type="submit">Sign In</Button>
            <input type='submit'/>
        </form>
        <Box component={'div'} sx={{display:'flex',justifyContent:'space-between',mt:'10px'}}>
            <Typography variant="body1" sx={{color:'#e22b2e',fontSize:'0.8rem'}}>* Required Fields</Typography>
            <SpanText>Forgot Your Password?</SpanText>
        </Box>

    </Boxx>
}


const SpanText=styled('span')`
    cursor: pointer;
    &:hover{
        color: #999;
    }
`

const Boxx=styled(Box)`
   .btn-signin{
        width:100%
   }
`

export default LoginFrom