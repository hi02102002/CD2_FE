import { deleteCookie } from 'cookies-next';

export default async function handler(req: any, res: any) {
    deleteCookie('auth_token', { req, res });
    deleteCookie('roles', { req, res });

    return res.status(200).json({ message: 'ok' });
}
