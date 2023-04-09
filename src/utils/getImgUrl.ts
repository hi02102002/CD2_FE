export const getImgUrls = (imageUrl: string) => {
    return imageUrl.split(',').filter((i) => i !== '');
};
