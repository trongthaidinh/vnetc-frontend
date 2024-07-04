import httpRequest from '~/utils/httpRequest';

let categoryNamesCache = {};

export const getCategories = async () => {
    try {
        const response = await httpRequest.get('/category');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching categories', error);
        throw error;
    }
};

export const getCategoryName = async (categoryId) => {
    if (categoryNamesCache[categoryId]) {
        return categoryNamesCache[categoryId];
    }

    try {
        const response = await httpRequest.get(`/category/${categoryId}`);
        const categoryName = response.data.data.name;
        categoryNamesCache[categoryId] = categoryName;
        return categoryName;
    } catch (error) {
        console.error(`Error fetching category name for ID ${categoryId}`, error);
        throw error;
    }
};
