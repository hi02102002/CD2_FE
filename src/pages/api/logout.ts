import { NextApiResponse } from 'next';

import { deleteCookie } from 'cookies-next';

export default async function handler(req: any, res: NextApiResponse) {
    deleteCookie('auth_token', {
        req,
        res,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        path: '/',
    });
    deleteCookie('roles', {
        req,
        res,
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        path: '/',
    });

    return res.status(200).json({ message: 'ok' });
}
