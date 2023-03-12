import { Button, Input } from "@/components/common";
import { DEVICE } from "@/constants";
import { pxToRem } from "@/utils/pxToRem"
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Rating, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup';


interface IFormInputs {
    review: string;
    rating: number;
}

const SignupSChema = yup.object().shape({
    review: yup.string().required(),
});

function Review(){

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({ resolver: yupResolver(SignupSChema) });
    
    const onSubmit = (data: IFormInputs) => {
        console.log(data);
    };


    return <Box component='div' paddingTop='60px'>
        <Box component='div' className="customer-reviews" sx={{borderBottom:'1px solid #eee'}}>
            <Typography variant="h4" marginBottom='30px'>Customer Reviews</Typography>
            <Box component='div' className="customer-reviews-item" sx={{paddingBottom:'40px'}}>
                <Typography variant="caption" sx={{fontSize:'14px',color:'#000',fontWeight:'600'}}>Cheap price, high quality</Typography>
                <StyledRatingComment component='div' >
                    <Box component='div' className="rating" >
                        <Typography component="legend" sx={{marginRight:'18px'}}>Customer Rating</Typography>
                        <Rating name="read-only" value={5} readOnly sx={{fontSize:'16px'}}/>    
                    </Box>
                    <Box component='div' className="comment"  fontSize='16px'>
                        <Typography variant="body1" sx={{marginBottom:'20px'}}>The quality of the shirt is very nice, in general, it is thick, good value for money so buy it, I guarantee it. Will be back for more support haha</Typography>
                        <Typography variant="body1">Review by <strong style={{fontWeight:'600',color:'#000'}}>Sơn</strong></Typography>
                    </Box>
                </StyledRatingComment>
            </Box>
        </Box>
        <StyledAddReview component='div' className="add-review">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box component='div' color="#000">
                    <Typography variant="caption" sx={{fontSize:'18px',marginRight:'6px'}}>You are reviewing:</Typography>
                    <Typography variant="caption" sx={{fontSize:'18px',fontWeight:'600'}}>Linen Check Blazer</Typography>
                
                </Box>
                <Box component='div'  sx={{display:'flex',alignItems:'center',margin:'30px 0'}}>
                    <Typography component="legend" sx={{marginRight:'18px'}}>Your Rating</Typography>
                    

                <Controller
                    name="rating"
                    control={control}
                    defaultValue={0}
                    rules={{required:true}}
                    
                    render={({ field: { onChange} }) => (
                        <Rating onChange={onChange}/>
                    )}
                />
                </Box> 

                <Box component='div' className="review-field-text">
                <Controller
                    name="review"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Review"
                            onChange={onChange}
                            value={value}
                            messageError={errors.review?.message}
                            isError={errors.review != undefined}
                            required
                        />
                    )}
                />
                </Box>

                <Button
                    typeButton="secondary"
                    className="btn-submit-review"
                    type="submit"
                >
                    Submit Review
                </Button>
                
            </form>
        </StyledAddReview>
    </Box>
}

const StyledRatingComment=styled(Box)`
    margin-top: ${pxToRem(20)};
    display: flex;

    .rating{
        display: flex;
        align-items: center;
        flex:1;
    }

    .comment{
        margin-left: ${pxToRem(24)};
        flex: 3;
    }

       @media ${DEVICE.mobileS}{
            flex-direction: column;

            .rating{
            margin-bottom: ${pxToRem(16)};
        }

            .comment{
            margin-left:0px;
    }
    }

        @media ${DEVICE.tablet}{
            flex-direction: row;

            .comment{
            margin-left:${pxToRem(24)};
            }
                }
`

const StyledAddReview= styled(Box)`
    .btn-submit-review{
        margin-top: ${pxToRem(30)};
        font-weight: 600;
    }
`
export default Review