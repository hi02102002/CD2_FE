import React from 'react';

import Image from 'next/image';

import { Box, IconButton, Stack, Typography, styled } from '@mui/material';
import { IconX } from '@tabler/icons-react';

import { pxToRem } from '@/utils/pxToRem';

type Props = {
    files: File[] | string[];
    onRemove?: (index: number) => void;
};

const ListFilePreview = ({ files, onRemove }: Props) => {
    return (
        <StyledListFilePreview>
            {files.map((file, index) => {
                if (typeof file === 'string') {
                    return (
                        <StyledListFilePreviewItem key={file}>
                            <Image
                                src={file.replace(',', '').trim()}
                                alt=""
                                width={50}
                                height={50}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                            <Typography flex={1} noWrap>
                                Image {index + 1}
                            </Typography>
                            <IconButton
                                color="error"
                                title="Remove file"
                                onClick={() => onRemove?.(index)}
                            >
                                <IconX />
                            </IconButton>
                        </StyledListFilePreviewItem>
                    );
                }
                return (
                    <StyledListFilePreviewItem key={file.name}>
                        <Image
                            src={URL.createObjectURL(file)}
                            alt=""
                            width={50}
                            height={50}
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                        <Typography noWrap flex={1}>
                            {file.name}
                        </Typography>
                        <IconButton
                            color="error"
                            title="Remove file"
                            onClick={() => onRemove?.(index)}
                        >
                            <IconX />
                        </IconButton>
                    </StyledListFilePreviewItem>
                );
            })}
        </StyledListFilePreview>
    );
};

const StyledListFilePreview = styled(Stack)`
    gap: ${pxToRem(8)};
    margin-top: ${pxToRem(8)};
`;

const StyledListFilePreviewItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: ${pxToRem(16)};
`;

export default React.memo(ListFilePreview);
