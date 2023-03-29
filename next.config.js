/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'd33wubrfki0l68.cloudfront.net',
            'blueskytechmage.com',
            'upload-image-shoppingcart.s3.ap-southeast-1.amazonaws.com',
        ],
    },
    async headers() {
        return [
            {
                // Set the CSP header to allow only the same origin to embed our website in an iframe or a frame.
                source: '/',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://www.facebook.com https://*.facebook.com",
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
