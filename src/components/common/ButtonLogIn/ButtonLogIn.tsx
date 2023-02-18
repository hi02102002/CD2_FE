import { Button, styled } from "@mui/material"

interface Props {
    content?: string;
    width?: string;
}

function ButtonLogIn(props:Props){
    return <ButtonI variant="contained" sx={{width: props.width === "lg" ? "100%" : "40%"}}>{props.content}</ButtonI>

}

const ButtonI = styled(Button)<Props>`
    /* width: ${props => props.width === 'lg' ? '100%' : '60%'} ; */
    text-transform: none;
    background-color: #222;
    color: #fff;
    transition: 0.4s;
    padding: 8px 16px;
    font-size: 1rem;
    font-weight: 600;

    &:hover{
        box-shadow: 0 0 0 0.2rem #222;
        background-color: #222;
    }
`

export default ButtonLogIn