export type TAddress = {
    id: number;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    isDefault: boolean;
};

export type TAddressInput = Omit<TAddress, 'id'>;
