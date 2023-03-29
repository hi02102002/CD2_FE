import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, MenuItem, Select, Stack, styled } from '@mui/material';
import { common } from '@mui/material/colors';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import {
    InputGroup,
    InputOptions,
    Label,
    ListFilePreview,
    MessageError,
    Upload,
} from '@/components/admin';
import { useOverflowHidden } from '@/hooks/useOverflowHidden';
import productService from '@/services/product.service';
import { Category } from '@/types/category';
import { pxToRem } from '@/utils/pxToRem';

import { Option } from '../InputOption/InputOption';
import LoadingFullPage from '../LoadingFullPage';

const productInputSchema = yup.object({
    name: yup.string().required('Product name is required'),
    description: yup.string().required('Description is required'),
    files: yup
        .array(
            yup.mixed().test('required', 'File is required', (file) => {
                if (file) return true;
                return false;
            }),
        )
        .min(1, 'File is required!'),
    categoryId: yup.number().required('Category is required'),
    price: yup
        .string()
        .required('Price is required')
        .test('test', 'Price is required', (value) => {
            if ([...value].every((v) => Number(v) === 0)) {
                return false;
            }
            return true;
        }),
    quantity: yup
        .string()
        .required('Quantity is required')
        .test('test', 'Quantity is required', (value) => {
            if ([...value].every((v) => Number(v) === 0)) {
                return false;
            }
            return true;
        }),
});
type FormData = yup.InferType<typeof productInputSchema>;

type Props = {
    categories: Category[];
};

const ProductAction = ({ categories }: Props) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(productInputSchema),
        defaultValues: {
            description: '',
            files: [],
            name: '',
        },
    });
    const [options, setOptions] = useState<Option[]>([]);
    const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);

    const [files, setFiles] = useState<File[] | string[]>(
        (watch('files') as File[] | string[]) || [],
    );

    useOverflowHidden(isLoadingAction);

    const handelAddFile = (_files: File[]) => {
        //@ts-ignore
        setFiles((f) => f.concat(_files));
        //@ts-ignore
        setValue('files', files.concat(_files), {
            shouldValidate: true,
        });
    };

    const handelRemoveFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles as File[] | string[]);
        setValue('files', newFiles, {
            shouldValidate: true,
        });
    };

    const handelAddProduct = async (fields: FormData) => {
        try {
            setIsLoadingAction(true);
            const { data } = await productService.addProduct(fields);
            if (options.length > 0) {
                await productService.addOptions({
                    productId: data.id,
                    options,
                });
            }
            setIsLoadingAction(false);
            toast.success('Add product successfully');
            reset({
                categoryId: undefined,
                description: undefined,
                files: [],
                name: undefined,
                price: undefined,
            });
            setFiles([]);
        } catch (error: any) {
            console.log(error);
            toast.error(
                error.response?.data?.message || 'Something went wrong',
            );
            setIsLoadingAction(false);
        }
    };

    return (
        <>
            <StyledProductAction>
                <form onSubmit={handleSubmit(handelAddProduct)}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <StyledContentWrapper>
                                <Stack gap={16}>
                                    <Controller
                                        render={({ field, fieldState }) => {
                                            return (
                                                <InputGroup
                                                    label="Product Name"
                                                    required
                                                    messageError={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    InputProps={{
                                                        ...field,
                                                    }}
                                                />
                                            );
                                        }}
                                        name="name"
                                        control={control}
                                    />
                                    <Controller
                                        render={({ field, fieldState }) => {
                                            return (
                                                <InputGroup
                                                    label="Price"
                                                    required
                                                    messageError={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    InputProps={{
                                                        ...field,
                                                        type: 'number',
                                                        onKeyDown: (e) => {
                                                            if (e.key === '-') {
                                                                e.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                />
                                            );
                                        }}
                                        name="price"
                                        control={control}
                                    />
                                    <Controller
                                        render={({ field, fieldState }) => {
                                            return (
                                                <InputGroup
                                                    label="Quantity"
                                                    required
                                                    messageError={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    InputProps={{
                                                        ...field,
                                                        type: 'number',
                                                        onKeyDown: (e) => {
                                                            if (e.key === '-') {
                                                                e.preventDefault();
                                                            }
                                                        },
                                                    }}
                                                />
                                            );
                                        }}
                                        name="quantity"
                                        control={control}
                                    />
                                    <Controller
                                        render={({ field, fieldState }) => {
                                            return (
                                                <InputGroup
                                                    label="Product Description"
                                                    required
                                                    messageError={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    InputProps={{
                                                        multiline: true,
                                                        minRows: 5,
                                                        maxRows: 10,
                                                        ...field,
                                                    }}
                                                />
                                            );
                                        }}
                                        name="description"
                                        control={control}
                                    />
                                    <div>
                                        <Label required>Category</Label>
                                        <Controller
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <Select
                                                        labelId="categoryId"
                                                        label="Category"
                                                        {...field}
                                                        error={
                                                            !!fieldState.error
                                                                ?.message
                                                        }
                                                        variant="standard"
                                                        fullWidth
                                                    >
                                                        {categories?.map(
                                                            (category) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        value={
                                                                            category.id
                                                                        }
                                                                    >
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </MenuItem>
                                                                );
                                                            },
                                                        )}
                                                    </Select>
                                                );
                                            }}
                                            name="categoryId"
                                            control={control}
                                        />
                                        {errors.categoryId?.message && (
                                            <MessageError>
                                                {errors.categoryId?.message}
                                            </MessageError>
                                        )}
                                    </div>
                                    <Controller
                                        render={({
                                            field: { onChange, onBlur },
                                            fieldState,
                                        }) => (
                                            <Box>
                                                <Upload
                                                    required
                                                    label="Image"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    onDrop={(acceptedFiles) => {
                                                        handelAddFile(
                                                            acceptedFiles,
                                                        );
                                                    }}
                                                    errorMessage={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                />
                                                <ListFilePreview
                                                    files={files}
                                                    onRemove={handelRemoveFile}
                                                />
                                            </Box>
                                        )}
                                        control={control}
                                        name="files"
                                    />
                                </Stack>
                            </StyledContentWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledContentWrapper>
                                <InputOptions
                                    value={options}
                                    onChange={(v) => {
                                        setOptions(v);
                                    }}
                                />
                            </StyledContentWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack justifyContent="end" direction="row">
                                <LoadingButton
                                    sx={{
                                        width: 160,
                                    }}
                                    variant="contained"
                                    type="submit"
                                >
                                    Add product
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </StyledProductAction>
            {isLoadingAction && <LoadingFullPage />}
        </>
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

// const StyledInputGroup = styled(Box)``;

export default ProductAction;