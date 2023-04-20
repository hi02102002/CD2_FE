import provincesJson from '../../province.json';

export const ROUTES = {
    HOME: '/',
    ADMIN: '/admin',
    LOGIN: '/login',
    ADMIN_CUSTOMER: '/admin/customer',
    ADMIN_CATEGORY: '/admin/category',
    ADMIN_PRODUCT: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_DISCOUNT: '/admin/discount',
    ADMIN_ADD_PRODUCT: '/admin/products/add-product',
    ADMIN_EDIT_PRODUCT: '/admin/products/edit-product',
    REGISTER: '/register',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
    FORGOT_PASS: '/forgot-password',
    RESET_PASS: '/reset-password',
    ACCOUNT: '/account',
    NOT_ALLOW: '/not-allow',
    ORDER_SUCCESS: '/checkout-success',
    CHANGE_PASS: '/account/change-password',
    ACCOUNT_ADDRESS: '/account/address',
    ACCOUNT_ORDER: '/account/orders',
    ACCOUNT_PRODUCT_REVIEW: '/account/product-review',
    ACCOUNT_CHANGE_INFO: '/account/change-info',
};

export const SIZE_MEDIA = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopM: '1200px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const DEVICE = {
    mobileS: `(min-width: ${SIZE_MEDIA.mobileS})`,
    mobileM: `(min-width: ${SIZE_MEDIA.mobileM})`,
    mobileL: `(min-width: ${SIZE_MEDIA.mobileL})`,
    tablet: `(min-width: ${SIZE_MEDIA.tablet})`,
    laptop: `(min-width: ${SIZE_MEDIA.laptop})`,
    laptopM: `(min-width: ${SIZE_MEDIA.laptopM})`,
    laptopL: `(min-width: ${SIZE_MEDIA.laptopL})`,
    desktop: `(min-width: ${SIZE_MEDIA.desktop})`,
    desktopL: `(min-width: ${SIZE_MEDIA.desktop})`,
};

export const API_URL = 'https://shopping-cart-demo.herokuapp.com';

export const provinces = JSON.parse(JSON.stringify(provincesJson));
export const phoneRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
