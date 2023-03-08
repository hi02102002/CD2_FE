export enum ROLE {
    ADMIN = 'ROLE_ADMIN',
    CUSTOMER = 'ROLE_CUSTOMER',
}

export type User = {
    id: number;
    fullName: string;
    email: string;
    roles: ROLE[];
    token: string;
};
