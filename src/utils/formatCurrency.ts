export const formatCurrency = (price: number) => {
    return (
        '$' +
        new Intl.NumberFormat('en', { currency: 'USD' }).format(price || 0)
    );
};
