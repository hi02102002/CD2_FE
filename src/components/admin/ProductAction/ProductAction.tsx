import { Box, Grid, Stack, styled } from '@mui/material';
import { common } from '@mui/material/colors';
import { Controller, useForm } from 'react-hook-form';

import { pxToRem } from '@/utils/pxToRem';

import InputGroup from '../InputGroup';

type Props = {};

const ProductAction = (props: Props) => {
    const { control } = useForm();

    return (
        <StyledProductAction>
            <form action="">
                <Grid container spacing={16}>
                    <Grid item xs={12} lg={8}>
                        <StyledContentWrapper>
                            <Stack gap={16}>
                                <Controller
                                    render={({}) => {
                                        return (
                                            <InputGroup
                                                label="Product Name"
                                                required
                                                messageError="Hello"
                                            />
                                        );
                                    }}
                                    name="name"
                                    control={control}
                                />
                                <Controller
                                    render={({}) => {
                                        return (
                                            <InputGroup
                                                label="Product Description"
                                                required
                                                messageError="Hello"
                                                InputProps={{
                                                    multiline: true,
                                                    minRows: 5,
                                                    maxRows: 10,
                                                }}
                                            />
                                        );
                                    }}
                                    name="name"
                                    control={control}
                                />
                            </Stack>
                        </StyledContentWrapper>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <StyledContentWrapper></StyledContentWrapper>
                    </Grid>
                </Grid>
            </form>
        </StyledProductAction>
    );
};

const StyledProductAction = styled(Box)`
    margin-top: ${pxToRem(16)};
`;

const StyledContentWrapper = styled(Box)`
    padding: ${pxToRem(16)};
    border-radius: 4px;
    background-color: ${common.white};
`;

const StyledInputGroup = styled(Box)``;

export default ProductAction;
