import {  Box, Checkbox, FormControlLabel, styled, Typography } from "@mui/material"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { pxToRem } from "@/utils/pxToRem";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/common"
import { DEVICE } from '@/constants';
import Input from "@/components/common/Input";
import { useState } from "react";


interface IFormInputs {
    fullname: string;
    email:string;
    password:string;
    confirmpassword:string,
}


  

const SignupSChema=yup.object().shape({
        fullname:yup.string().required('Vui lòng nhập đầy đủ họ và tên').min(6,'Tối thiểu 6 kí tự'),
        email:yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng địa chỉ email'),
        password:yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(8,"Mật khẩu quá ngắn" )
        .matches(/\d+/, "Mật khẩu cần ít nhất 1 số" )
        .matches(/[a-z]+/,"Mật khẩu cần ít nhất 1 kí tự thường" )
        .matches(/[A-Z]+/,"Mật khẩu cần ít nhất 1 kí tự in hoa" )
        .matches(/[!@#$%^&*()-+]+/,  "Mật khẩu cần ít nhất 1 kí tự đặc biệt" )
        // .matches(/ ![a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,  "Mật khdsadsẩu cần ít nhất 1 kí tự đặc biệt" )
  .test(
    "Mật khẩu không chứa khoảng trắng",
    "Mật khẩu không chứa khoảng trắng" ,
    value => !/\s+/.test(value)
  ),
        confirmpassword:yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu nhập lại không chính xác'),
    })

function RegisterContainer(){

    const {control,handleSubmit,formState:{errors}}=useForm<IFormInputs>({resolver:yupResolver(SignupSChema)});
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = (data: IFormInputs) => {
        console.log(data);
      };

      const handleTogglePassword =()=>{
        setShowPassword(!showPassword)
  }

    return  <form onSubmit={handleSubmit(onSubmit)} >
            <RegisterContainerr>
                <Box  className="PersonalInfor"  >
                    <Typography variant="h5" sx={{fontWeight:'600',mb:pxToRem(15),lineHeight:pxToRem(42),color:'#000'}} >Personal Information</Typography>
                        <Box component='div'>
                                <Controller name='fullname' control={control} defaultValue='' render={({field:{onChange,value}})=>
                                    <Input label="Full Name"  onChange={onChange} value={value}   messageError={errors.fullname?.message} isError={errors.fullname!=undefined} required sx={{mb:'12px'}} ></Input>  
                                }></Controller>
    
                    <FormControlLabel control={<Checkbox/>} sx={{mb:pxToRem(20),display:'block'}} label='Sign Up for Newsletter' ></FormControlLabel>

                    <FormControlLabel control={<Checkbox/>} sx={{mb:pxToRem(20)}} label='Allow remote shopping assistance'></FormControlLabel>

                        </Box>
                </Box>
        
                <Box  className="SignInInfo"  >
                        <Typography variant="h5" sx={{fontWeight:'600',mb:pxToRem(15),lineHeight:pxToRem(42),color:'#000'}}>Sign-in Information</Typography>
                            <Box component='div'>
                                <Controller name="email" control={control} defaultValue='' render={({field:{onChange,value}})=>
                                    <Input label="Email"  onChange={onChange} value={value}  messageError={errors.email?.message} isError={errors.email!=undefined} required sx={{mb:'12px'}} ></Input>  
                                }></Controller>

                                <Controller name="password" control={control} defaultValue='' render={({field:{onChange,value}})=>
                                    <Input label="Password"  onChange={onChange} value={value} type={showPassword ? 'text' :'password'}  messageError={errors.password?.message} isError={errors.password!=undefined} required sx={{mb:'12px'}} ></Input>  
                                }></Controller>

                                {/* <Typography variant="body1" fontWeight='500' margin={`0 0 ${pxToRem(15)} ${pxToRem(12)}`} lineHeight='42px' color={'#666666'}  >Password Strength: No Password</Typography> */}
                                
                                <Controller name="confirmpassword" control={control} defaultValue='' render={({field:{onChange,value}})=>
                                    <Input label="Confirm Password" onChange={onChange} value={value} type={showPassword ? 'text' :'password'}  messageError={errors.confirmpassword?.message} isError={errors.confirmpassword!=undefined} required sx={{mb:'12px'}} ></Input>  
                                }></Controller>
    
                        <FormControlLabel control={<Checkbox/>} sx={{mb:`${pxToRem(20)}`}} label='Show Password' onChange={handleTogglePassword}></FormControlLabel>

    
                        <Button typeButton="primary" className="btn-create" type="submit">Create an Account</Button>
                        
                            </Box>
                </Box>
            </RegisterContainerr>
                </form> 
        
}

const RegisterContainerr = styled('div')`
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
    
        
        
        @media ${DEVICE.tablet} {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    .PersonalInfor{
        padding: ${pxToRem(0)} ${pxToRem(30)} ${pxToRem(0)} ${pxToRem(0)};
        margin-bottom: ${pxToRem(30)};
        flex: 1;
        @media ${DEVICE.mobileS} {
           padding: 0;
           width: 100%;

        }

        @media ${DEVICE.tablet} {
           padding-right: ${pxToRem(30)};
           /* width: 100%; */

        }
    }

    .SignInInfo{
        padding: ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(0)} ${pxToRem(30)};
        flex: 1;
        @media ${DEVICE.mobileS} {
            padding: 0;
        }

        @media ${DEVICE.tablet} {
           padding-left: ${pxToRem(30)};
           /* width: 100%; */

        }

        .btn-create{
            @media ${DEVICE.mobileS} {
                padding-left: ${pxToRem(2)};
                padding-right: ${pxToRem(2)};
                margin: auto;
                width: 60%;
        }
        @media ${DEVICE.mobileM} {
                padding-left: ${pxToRem(4)};
                padding-right: ${pxToRem(4)};
                margin: auto;
                width: 50%;
        }

      
        @media ${DEVICE.tablet} {
                padding-left: ${pxToRem(10.5)};
                padding-right: ${pxToRem(16)};
                margin: 0;
                width: 60%;
        }
    }
   

`



export default RegisterContainer