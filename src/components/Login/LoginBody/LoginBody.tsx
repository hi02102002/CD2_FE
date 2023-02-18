import { styled } from "@mui/material";
import LoginContainer from "../LoginContainer";
import SignInSocial from "../../common/SignInSocial"

function LoginBody(){
    return <Main className="main">
        <Login className="block-content">
            <SignInSocial social="facebook" />
            <SignInSocial social="google" />
        </Login>
        <LoginContainer></LoginContainer>
    </Main>
}

const Login = styled('div')`
    display: flex;
    justify-content: center;
    margin-bottom: 48px;
` 

const Main = styled('div')`
    max-width: 1200px;
    margin: 40px auto 0px;
` 
export default LoginBody;
