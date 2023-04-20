import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import addressService from '@/services/address.service';
import { TAddress, TAddressInput } from '@/types/address';

type AddressState = {
    addresses: TAddress[];
    handelAddAddress: (fields: TAddressInput) => Promise<void>;
    handelUpdateAddress: (id: number, fields: TAddressInput) => Promise<void>;
    handelRemoveAddress: (id: number) => Promise<void>;
    fetchAddress: () => Promise<void>;
};

const useAddressStore = create<AddressState>()(
    devtools(
        immer((set, get) => {
            return {
                addresses: [],
                fetchAddress: async () => {
                    try {
                        const res = await addressService.getAddress();

                        set((state) => {
                            state.addresses = res.data;
                        });
                    } catch (error) {}
                },
                handelAddAddress: async (fields) => {
                    const res = await addressService.addAddress({
                        ...fields,
                        isDefault: fields.isDefault || false,
                    });

                    set((state) => {
                        if (res.data.isDefault) {
                            state.addresses = state.addresses.map((a) => {
                                return {
                                    ...a,
                                    isDefault: false,
                                };
                            });
                        }
                        state.addresses = state.addresses.concat(res.data);
                    });
                },

                handelRemoveAddress: async (id) => {
                    await addressService.deleteAddress(id);

                    set((state) => {
                        state.addresses = state.addresses.filter(
                            (a) => a.id !== id,
                        );
                    });
                },
                handelUpdateAddress: async (id, fields) => {
                    const res = await addressService.updateAddress(id, fields);

                    set((state) => {
                        if (res.data.isDefault) {
                            state.addresses = state.addresses.map((a) => {
                                return {
                                    ...a,
                                    isDefault: false,
                                };
                            });
                        }
                        state.addresses = state.addresses.map((a) => {
                            if (a.id === res.data.id) {
                                return {
                                    ...a,
                                    ...res.data,
                                };
                            }
                            return a;
                        });
                    });
                },
            };
        }),
        {
            name: 'address',
        },
    ),
);

export default useAddressStore;
