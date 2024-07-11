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

export const getCategoryName = async (id) => {
    if (categoryNamesCache[id]) {
        return categoryNamesCache[id];
    }

    try {
        const response = await httpRequest.get(`/category/${id}`);
        const categoryName = response.data.data.name;
        categoryNamesCache[categoryName] = categoryName;
        return categoryName;
    } catch (error) {
        console.error(`Error fetching category name for ID ${id}`, error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await httpRequest.get(`/category/${id}`);
        const category = response.data.data;
        return category;
    } catch (error) {
        console.error(`Error fetching category name for ID ${id}`, error);
        throw error;
    }
};

export const getCategoriesByType = async (type) => {
    try {
        const response = await httpRequest.get(`/category/type/${type}`);
        const categories = response.data.data;
        return categories;
    } catch (error) {
        console.error(`Error fetching category name for type ${type}`, error);
        throw error;
    }
};
