import { IconButton, Stack, Typography } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { omit } from 'lodash';
import { Controller } from 'react-hook-form';

import { Option } from '@/types/product';

import InputGroup from '../InputGroup';

type Props = {
    options: Option[];
    onRemove: (
        value: { [key: string]: string | undefined },
        index: number,
    ) => void;
    control: any;
};

const FormVariants = ({ options, onRemove, control }: Props) => {
    return (
        <Stack gap={16}>
            <Typography variant="h4">Update Options</Typography>
            <Stack gap={16}>
                {options.map((option, index) => {
                    return (
                        <Stack
                            key={option.id}
                            direction="row"
                            gap={16}
                            alignItems="start"
                        >
                            {Object.entries(option).map(([key]) => {
                                const isReadOnly =
                                    key !== 'quantity' && key !== 'price';

                                if (key === 'id') {
                                    return null;
                                }

                                return (
                                    <Controller
                                        control={control}
                                        key={key}
                                        name={`options.${index}.${key}`}
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'This field is required',
                                            },
                                        }}
                                        render={({ field, fieldState }) => {
                                            return (
                                                <InputGroup
                                                    label={
                                                        key
                                                            .slice(0, 1)
                                                            .toUpperCase() +
                                                        key.slice(1)
                                                    }
                                                    InputProps={{
                                                        readOnly: isReadOnly,
                                                        ...field,
                                                        error:
                                                            fieldState.error !==
                                                            undefined,
                                                    }}
                                                    messageError={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                    required
                                                />
                                            );
                                        }}
                                    />
                                );
                            })}
                            <IconButton
                                color="error"
                                onClick={() => {
                                    onRemove(
                                        {
                                            ...omit(option, [
                                                'quantity',
                                                'price',
                                            ]),
                                        },
                                        index,
                                    );
                                }}
                                sx={{
                                    alignSelf: 'center',
                                }}
                            >
                                <IconX />
                            </IconButton>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};

export default FormVariants;
