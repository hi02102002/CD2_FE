import styled from "@emotion/styled"
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from "@/components/common"
import Input from "@/components/common/Input"
import {  useState } from "react";
import { pxToRem } from "@/utils/pxToRem";


interface IFormInputs {
    email:string;
    password:string;
}

const SignupSChema=yup.object().shape({
        email:yup.string().required('Vui lòng nhập email ').email('Vui lòng nhập đúng địa chỉ email'),
        password:yup.string().required('Vui lòng nhập mật khẩu')
    })


function LoginFrom(){
    const {control,handleSubmit,formState:{errors}}=useForm<IFormInputs>({resolver:yupResolver(SignupSChema)});

    const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: IFormInputs) => {
    console.log(data);
  };

  const handleTogglePassword =()=>{
        setShowPassword(!showPassword)
  }
    return <Boxx component='div'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="email" control={control} defaultValue='' render={({field:{onChange,value}})=>
                <Input label="Email" onChange={onChange} value={value} messageError={errors.email?.message} isError={errors.email!=undefined} required sx={{mb:'12px'}}  ></Input>  
            }></Controller>
               
            <Controller name="password" control={control} defaultValue='' render={({field:{onChange,value}})=>
                 <Input label="Password" onChange={onChange} value={value}  messageError={errors.password?.message} isError={errors.password!=undefined} required  type={showPassword ? 'text' :'password'}></Input>
            }></Controller>
           
    
        <FormControlLabel control={<Checkbox />} sx={{mb:pxToRem(20)}} label='Show Password' onChange={handleTogglePassword}></FormControlLabel>
    
        <Button typeButton="primary" className="btn-signin" type="submit">Sign In</Button>
        </form>
        <Box component={'div'} sx={{display:'flex',justifyContent:'space-between',mt:pxToRem(10)}}>
            <Typography variant="body1" sx={{color:'#e22b2e',fontSize:pxToRem(12)}}>* Required Fields</Typography>
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