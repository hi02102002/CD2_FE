import { useState } from 'react';





import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';



import useCategoryStore from '@/store/category';
import { CategoryInputSchema, FormInputs } from '@/types/category';



import InputGroup from '../InputGroup';
import ListFilePreview from '../ListFilePreview';
import LoadingFullPage from '../LoadingFullPage';
import ModalWrapper from '../ModalWrapper';
import Upload from '../Upload';


type Props = {
    onClose?: () => void;
    type?: 'ADD' | 'EDIT';
    dataEdit?:
        | (FormInputs & {
              id: number;
          })
        | null;
};

const CategoryAction = ({ onClose, type = 'ADD', dataEdit }: Props) => {
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: {},
    } = useForm<FormInputs>({
        resolver: yupResolver(CategoryInputSchema),
        values: {
            code: dataEdit?.code as string,
            name: dataEdit?.name as string,
            file: dataEdit?.file || [],
        },
    });
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const { addCategory, updateCategory } = useCategoryStore();

    const [files, setFiles] = useState<File[] | string[]>(
        (watch('file') as File[] | string[]) || [],
    );

    const handelAddCategory = async (data: FormInputs) => {
        try {
            setIsLoadingAction(true);
            await addCategory({
                ...data,
                //@ts-ignore
                file: data.file?.[0],
            });
            setIsLoadingAction(false);
            toast.success('Add category successfully');
            onClose?.();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Try again');
            setIsLoadingAction(false);
        }
    };

    const handelUpdateCategory = async (data: FormInputs) => {
        try {
            console.log(data);
            setIsLoadingAction(true);
            await updateCategory(dataEdit?.id as number, {
                ...data,
                //@ts-ignore
                file:
                    typeof data.file?.[0] === 'string'
                        ? undefined
                        : data.file?.[0],
            });
            setIsLoadingAction(false);
            toast.success('Update category successfully');
            onClose?.();
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Try again');
            setIsLoadingAction(false);
        }
    };

    const handelAddFile = (files: File[]) => {
        setFiles(files);
        setValue('file', files, {
            shouldValidate: true,
        });
    };

    const handelRemoveFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles as File[] | string[]);
        setValue('file', newFiles, {
            shouldValidate: true,
        });
    };

    return (
        <>
            <ModalWrapper>
                <form
                    onSubmit={handleSubmit(
                        type === 'ADD'
                            ? handelAddCategory
                            : handelUpdateCategory,
                    )}
                >
                    <ModalWrapper.Header
                        titleText={
                            type === 'ADD' ? 'Add category' : 'Edit category'
                        }
                        onClose={onClose}
                    />
                    <Divider />
                    <Box padding={16}>
                        <Stack gap={16}>
                            <Controller
                                render={({ field, fieldState }) => {
                                    return (
                                        <InputGroup
                                            label="Name"
                                            required
                                            messageError={
                                                fieldState.error?.message
                                            }
                                            InputProps={{
                                                ...field,
                                            }}
                                        />
                                    );
                                }}
                                control={control}
                                name="name"
                            />
                            <Controller
                                render={({ field, fieldState }) => {
                                    return (
                                        <InputGroup
                                            required
                                            label="Code"
                                            {...field}
                                            messageError={
                                                fieldState.error?.message
                                            }
                                            InputProps={{
                                                ...field,
                                            }}
                                        />
                                    );
                                }}
                                control={control}
                                name="code"
                            />
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
                                                handelAddFile(acceptedFiles);
                                            }}
                                            errorMessage={
                                                fieldState.error?.message
                                            }
                                            multiple={false}
                                        />
                                        <ListFilePreview
                                            files={files}
                                            onRemove={handelRemoveFile}
                                        />
                                    </Box>
                                )}
                                control={control}
                                name="file"
                            />
                        </Stack>
                    </Box>
                    <Divider />
                    <ModalWrapper.Footer
                        ButtonCancelProps={{
                            onClick: onClose,
                        }}
                        ButtonOkProps={{
                            type: 'submit',
                            loading: isLoadingAction,
                        }}
                    />
                </form>
            </ModalWrapper>
            {isLoadingAction && <LoadingFullPage />}
        </>
    );
};

export default CategoryAction;