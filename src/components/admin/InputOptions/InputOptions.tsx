import { useState } from 'react';

import { Button, IconButton, Stack } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { cloneDeep } from 'lodash';

import InputOption from '../InputOption';
import type { Option } from '../InputOption/InputOption';
import Label from '../Label';

type Props = {
    value?: Option[];
    onChange?: (value: Option[]) => void;
};

const InputOptions = ({ value: propsValue, onChange }: Props) => {
    const [options, setOptions] = useState<Option[]>(propsValue || []);

    const isControl = propsValue !== undefined;

    let value = isControl ? cloneDeep(propsValue) : cloneDeep(options);

    const handelChange = (index: number) => (v: Option) => {
        value[index] = {
            ...value[index],
            ...v,
        };

        if (!isControl) {
            setOptions(value);
        }

        onChange?.(value);
    };

    const handelRemove = (index: number) => {
        value = value.filter((v, i) => i !== index);

        if (!isControl) {
            setOptions(value);
        }

        onChange?.(value);
    };

    const handelAdd = () => {
        if (value.length < 2) {
            const option: Option = {
                key: '',
                values: [],
            };
            value.push(option);
            if (!isControl) {
                setOptions(value);
            }

            onChange?.(value);
        }
    };

    return (
        <Stack gap={8}>
            <Label>Options</Label>
            <Stack gap={16}>
                {value.map((option, index) => {
                    return (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            gap={16}
                        >
                            <InputOption
                                value={option}
                                onChange={handelChange(index)}
                            />
                            <IconButton
                                onClick={() => handelRemove(index)}
                                color="error"
                            >
                                <IconX />
                            </IconButton>
                        </Stack>
                    );
                })}
            </Stack>
            {value.length < 2 && (
                <Button
                    sx={{
                        alignSelf: 'start',
                    }}
                    size="small"
                    variant="contained"
                    onClick={handelAdd}
                >
                    Add option
                </Button>
            )}
        </Stack>
    );
};

export default InputOptions;
