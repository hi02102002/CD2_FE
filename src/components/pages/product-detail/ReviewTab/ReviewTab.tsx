import { Box} from "@mui/material"
import ListReviews from "../ListReviews";
import ReviewForm from "../ReviewForm";



function ReviewTab(){
    return <Box component='div' paddingTop='60px'>
        <ListReviews></ListReviews>
        <ReviewForm></ReviewForm>
    </Box>
}



export default ReviewTab