import axiosClient from '@/lib/axiosClient';
import { TAddress, TAddressInput } from '@/types/address';
import { BaseResponse } from '@/types/shared';

class AddressService {
    async addAddress(fields: TAddressInput): Promise<BaseResponse<TAddress>> {
        return axiosClient.post('/api/address', fields);
    }
    async updateAddress(
        id: number,
        fields: TAddressInput,
    ): Promise<BaseResponse<TAddress>> {
        return axiosClient.put('/api/address', fields, {
            params: {
                addressId: id,
            },
        });
    }
    async deleteAddress(id: number): Promise<BaseResponse<any>> {
        return axiosClient.delete('/api/address', {
            params: {
                addressId: id,
            },
        });
    }
    async getAddress(): Promise<BaseResponse<Array<TAddress>>> {
        return axiosClient.get('/api/address');
    }
}

const addressService = new AddressService();
export default addressService;
