import { useEffect, useState } from 'react';

import {
    Checkbox,
    FormControlLabel,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { Input, MenuItem, Select } from '@/components/common';
import { provinces } from '@/constants';
import { TAddressInput } from '@/types/address';
import { pxToRem } from '@/utils/pxToRem';

type Props = {
    defaultValue?: TAddressInput;
};

const AddressForm = ({ defaultValue }: Props) => {
    const { setValue, control } = useFormContext();
    const [province, setProvince] = useState<any>(null);
    const [district, setDistrict] = useState<any>(null);
    const [ward, setWard] = useState<any>(null);

    const handelChangeProvince = (e: SelectChangeEvent<any>) => {
        setProvince(
            provinces.find((p: any) => {
                return p.Name === e.target.value;
            }) || null,
        );
        setDistrict(null);
        setWard(null);
        setValue('province', e.target.value, {
            shouldValidate: true,
        });
        setValue('district', '', {
            shouldValidate: true,
        });
        setValue('ward', '', {
            shouldValidate: true,
        });
    };

    const handelChangeDistrict = (e: SelectChangeEvent<any>) => {
        setDistrict(
            province?.Districts.find((d: any) => {
                return d.Name === e.target.value;
            }) || null,
        );
        setWard(null);
        setValue('district', e.target.value, {
            shouldValidate: true,
        });
        setValue('ward', '', {
            shouldValidate: true,
        });
    };

    const handelChangeWard = (e: SelectChangeEvent<any>) => {
        setWard(
            district?.Wards.find((w: any) => {
                return w.Name === e.target.value;
            }) || null,
        );
        setValue('ward', e.target.value, {
            shouldValidate: true,
        });
    };

    useEffect(() => {
        if (defaultValue) {
            const _province =
                provinces.find((p: any) => p.Name === defaultValue?.province) ||
                null;
            const _district =
                _province?.Districts.find((d: any) => {
                    return d.Name === defaultValue?.district;
                }) || null;
            const _ward =
                _district?.Wards.find((w: any) => {
                    return w.Name === defaultValue?.ward;
                }) || null;
            setProvince(_province);
            setDistrict(_district);
            setWard(_ward);
            setValue('province', _province?.Name);
            setValue('district', _district?.Name);
            setValue('ward', _ward?.Name);
            setValue('addressDetail', defaultValue.addressDetail);
            setValue('isDefault', defaultValue.isDefault);
        }
    }, [defaultValue, setValue]);

    return (
        <>
            <Stack gap={16}>
                <Controller
                    name="province"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Select
                                label="Province"
                                required
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                        PaperProps: {
                                            sx: {
                                                height: pxToRem(200),
                                            },
                                        },
                                    },
                                    ...field,
                                    onChange: handelChangeProvince,
                                    value: province?.Name || '',
                                }}
                                isError={!!fieldState.error?.message}
                                messageError={fieldState.error?.message}
                            >
                                {provinces.map((province: any) => {
                                    return (
                                        <MenuItem
                                            disableTouchRipple
                                            value={province.Name}
                                            key={province.Id}
                                        >
                                            {province.Name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        );
                    }}
                />

                <Controller
                    name="district"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Select
                                label="District"
                                required
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                        PaperProps: {
                                            sx: {
                                                height: pxToRem(200),
                                            },
                                        },
                                    },
                                    ...field,
                                    onChange: handelChangeDistrict,
                                    value: district?.Name || '',
                                }}
                                isError={!!fieldState.error?.message}
                                messageError={fieldState.error?.message}
                            >
                                {province?.Districts?.map((district: any) => {
                                    return (
                                        <MenuItem
                                            disableTouchRipple
                                            value={district.Name}
                                            key={district.Id}
                                        >
                                            {district.Name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        );
                    }}
                />

                <Controller
                    name="ward"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Select
                                label="Ward"
                                required
                                SelectProps={{
                                    MenuProps: {
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                        PaperProps: {
                                            sx: {
                                                height: pxToRem(200),
                                            },
                                        },
                                    },
                                    ...field,
                                    onChange: handelChangeWard,
                                    value: ward?.Name || '',
                                }}
                                isError={!!fieldState.error?.message}
                                messageError={fieldState.error?.message}
                            >
                                {district?.Wards?.map((ward: any) => {
                                    return (
                                        <MenuItem
                                            disableTouchRipple
                                            value={ward.Name}
                                            key={ward.Id}
                                        >
                                            {ward.Name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        );
                    }}
                />
                <Controller
                    name="addressDetail"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Input
                                label="Address detail"
                                placeholder="Address detail"
                                required
                                isError={!!fieldState.error?.message}
                                messageError={fieldState.error?.message}
                                {...field}
                            />
                        );
                    }}
                />
                <Controller
                    name="isDefault"
                    control={control}
                    render={({ field }) => {
                        return (
                            <FormControlLabel
                                defaultChecked={defaultValue?.isDefault}
                                {...field}
                                control={
                                    <Checkbox
                                        disableRipple
                                        defaultChecked={defaultValue?.isDefault}
                                    />
                                }
                                label="Set as default"
                            />
                        );
                    }}
                />
            </Stack>
        </>
    );
};

export default AddressForm;
