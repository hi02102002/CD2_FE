import React, { ChangeEvent, FocusEvent } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import Dropzone, { DropzoneProps, DropzoneRef } from 'react-dropzone';

import { pxToRem } from '@/utils/pxToRem';

const Upload = ({
    onDrop,
    multiple,
    onChange,
    errorMessage,
    onBlur,
    label,
    required,
    ...props
}: DropzoneProps &
    React.RefAttributes<DropzoneRef> & {
        onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
        onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
        errorMessage?: string;
        label: string;
        required?: boolean;
    }) => {
    return (
        <Dropzone
            onDrop={onDrop}
            multiple={multiple}
            {...props}
            accept={{
                'image/*': [],
            }}
        >
            {({ getRootProps, getInputProps }) => (
                <StyledUploadWrapper>
                    <Typography
                        color={(theme) => theme.themeColor.primary}
                        className={required ? 'required' : ''}
                        marginBottom={8}
                    >
                        {label}
                    </Typography>
                    <StyledUpload
                        {...getRootProps()}
                        className={errorMessage ? 'error' : ''}
                    >
                        <input
                            {...getInputProps({
                                onChange,
                                onBlur,
                            })}
                        />
                        <Typography>Drag / Drop file here.</Typography>
                    </StyledUpload>

                    {errorMessage && (
                        <Typography className="err-message">
                            {errorMessage}
                        </Typography>
                    )}
                </StyledUploadWrapper>
            )}
        </Dropzone>
    );
};

const StyledUploadWrapper = styled(Box)`
    .required {
        display: flex;
        align-items: center;
        gap: ${pxToRem(4)};

        &::after {
            content: ' *';
            color: ${red[500]};
        }
    }

    .err-message {
        margin-top: ${pxToRem(7)};
        font-size: ${pxToRem(14)};
        color: ${red[500]};
    }
`;

const StyledUpload = styled(Box)`
    padding: ${pxToRem(16)};
    border-radius: 4px;
    border: 2px dashed ${grey[300]};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.error {
        border-color: ${red[500]};
    }
`;

export default React.memo(Upload);
