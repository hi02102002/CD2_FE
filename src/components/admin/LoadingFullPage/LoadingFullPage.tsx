import { Backdrop, CircularProgress, styled } from '@mui/material';

const LoadingFullPage = () => {
    return (
        <StyledLoadingFullPage
            open
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
            <CircularProgress color="inherit" />
        </StyledLoadingFullPage>
    );
};

const StyledLoadingFullPage = styled(Backdrop)`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
`;

export default LoadingFullPage;
