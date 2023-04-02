export const ROUTES = {
    HOME: '/',
    ADMIN: '/admin',
    LOGIN: '/login',
    ADMIN_CUSTOMER: '/admin/customer',
    ADMIN_CATEGORY: '/admin/category',
    ADMIN_PRODUCT: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_ADD_PRODUCT: '/admin/products/add-product',
    ADMIN_EDIT_PRODUCT: '/admin/products/edit-product',
    REGISTER: '/register',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
    FORGOT_PASS: '/forgot-password',
    RESET_PASS: '/reset-password',
    ACCOUNT: '/account',
    PRODUCT_DETAIL: '/product-detail',
    NOT_ALLOW: '/not-allow',
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

/**
 *  mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
 * 
 */

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
