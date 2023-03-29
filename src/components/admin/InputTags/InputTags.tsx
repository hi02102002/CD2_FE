import { KeyboardEvent, useRef, useState } from 'react';

import { Chip, Stack, TextField, styled } from '@mui/material';

import { pxToRem } from '@/utils/pxToRem';

import Label from '../Label';

export type Tag = {
    name: string;
    value: string;
};

type Props = {
    value?: string[];
    onChange?: (values: string[]) => void;
};

const InputTags = ({ value: valueProps, onChange }: Props) => {
    const [values, setValues] = useState<Array<string>>(valueProps || []);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const isControl = valueProps !== undefined;

    let tags = isControl ? [...valueProps] : [...values];

    const handelAdd = () => {
        if (
            isExist(inputRef.current?.value as string) ||
            (inputRef.current?.value as string).length === 0
        ) {
            return;
        }

        tags = tags.concat(inputRef.current?.value as string);

        if (!isControl) {
            setValues(tags);
        }

        onChange?.(tags);

        if (inputRef.current?.value) {
            inputRef.current.value = '';
        }
    };

    const handelRemove = (tag: string) => {
        tags = tags.filter((_tag) => _tag !== tag);

        if (!isControl) {
            setValues(tags);
        }

        onChange?.(tags);
    };

    const isExist = (tag: string) => {
        return tags.some((t) => t === tag);
    };

    const handelRemoveBackSpace = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Backspace' && !inputRef.current?.value.length) {
            e.preventDefault();
            tags.pop();
        }

        if (!isControl) {
            setValues(tags);
        }

        onChange?.(tags);
    };

    return (
        <StyledInputTags className="input-tags">
            <Label>Tags</Label>
            <Stack direction="row" alignItems="center" gap={8} flexWrap="wrap">
                <StyledListTag className="list-tag">
                    {tags.map((tag) => {
                        return (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => {
                                    handelRemove(tag);
                                }}
                                variant="filled"
                                size="small"
                            />
                        );
                    })}
                    <TextField
                        variant="standard"
                        inputRef={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handelAdd();
                            }
                            handelRemoveBackSpace(e);
                        }}
                        sx={{
                            flexGrow: 1,
                        }}
                    />
                </StyledListTag>
            </Stack>
        </StyledInputTags>
    );
};

const StyledInputTags = styled(Stack)`
    gap: ${pxToRem(8)};
`;

const StyledListTag = styled(Stack)`
    flex-direction: row;
    align-items: center;
    gap: ${pxToRem(8)};
    flex-wrap: wrap;
    width: 100%;
`;

export default InputTags;
