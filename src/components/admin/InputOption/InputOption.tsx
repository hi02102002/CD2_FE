import { ChangeEvent, useState } from 'react';

import { Grid, Stack, TextField } from '@mui/material';

import InputTags from '../InputTags';
import Label from '../Label';

export type Option = {
    key: string;
    values: string[];
};

type Props = {
    value?: Option;
    onChange?: (value: Option) => void;
};

const InputOption = ({ value: propsValue, onChange }: Props) => {
    const [option, setOption] = useState<Option>({
        key: propsValue?.key || '',
        values: propsValue?.values || [],
    });

    const isControl = propsValue !== undefined;

    let value = isControl ? { ...propsValue } : { ...option };

    const handelChangeTags = (tags: string[]) => {
        value = {
            ...value,
            values: tags,
        };
        if (!isControl) {
            setOption(value);
        }
        onChange?.(value);
    };

    const handelChangeKey = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        value = {
            ...value,
            key: e.target.value,
        };
        if (!isControl) {
            setOption(value);
        }
        onChange?.(value);
    };

    return (
        <Grid container spacing={16}>
            <Grid item xs={6}>
                <Stack gap={8}>
                    <Label>Option</Label>
                    <TextField
                        variant="standard"
                        value={value.key}
                        onChange={handelChangeKey}
                    />
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <InputTags value={value.values} onChange={handelChangeTags} />
            </Grid>
        </Grid>
    );
};

export default InputOption;
