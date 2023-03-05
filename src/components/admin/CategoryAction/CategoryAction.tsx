import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

import categoryService from '@/services/category.service';
import { CategoryInputSchema, FormInputs } from '@/types/category';

import InputGroup from '../InputGroup';
import ListFilePreview from '../ListFilePreview';
import ModalWrapper from '../ModalWrapper';
import Upload from '../Upload';

type Props = {
    onClose?: () => void;
    type?: 'ADD' | 'EDIT';
    dataEdit?: FormInputs;
};

const CategoryAction = ({ onClose, type = 'ADD', dataEdit }: Props) => {
    const { control, handleSubmit, setValue, watch } = useForm<FormInputs>({
        resolver: yupResolver(CategoryInputSchema),
        values: {
            code: dataEdit?.code as string,
            name: dataEdit?.name as string,
            file: dataEdit?.file,
        },
    });

    const [files, setFiles] = useState<File[] | string[]>(
        (watch('file') as File[] | string[]) || [],
    );

    const handelAddCategory = async (data: FormInputs) => {
        await categoryService.addCategory(data);
    };

    const handelUpdateCategory = async (data: FormInputs) => {
        console.log(data);
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
        <ModalWrapper>
            <form
                onSubmit={handleSubmit(
                    type === 'ADD' ? handelAddCategory : handelUpdateCategory,
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
                                        messageError={fieldState.error?.message}
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
                                        messageError={fieldState.error?.message}
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
                                        errorMessage={fieldState.error?.message}
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
                    }}
                />
            </form>
        </ModalWrapper>
    );
};

export default CategoryAction;
