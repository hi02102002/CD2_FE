export enum ROLE {
    ADMIN = 'ROLE_ADMIN',
    CUSTOMER = 'ROLE_CUSTOMER',
}

export type User = {
    id: number;
    fullName: string;
    email: string;
    roles: ROLE[];
    phoneNumber: string | null;
    sex: string | null;
    dateOfBirth: string;
};
