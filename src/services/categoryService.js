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

export const getCategoriesByType = async (value) => {
    try {
        const response = await httpRequest.get(`/category/type?value=${value}`);
        const categories = response.data.data;
        return categories;
    } catch (error) {
        console.error(`Error fetching category name for type ${value}`, error);
        throw error;
    }
};

export const addCategory = async (categoryData) => {
    try {
        const response = await httpRequest.post('/category', categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        throw error;
    }
};

export const updateCategory = async (id, categoryData) => {
    try {
        const response = await httpRequest.patch(`/category/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await httpRequest.delete(`/category/${id}`);
        const category = response.data.data;
        return category;
    } catch (error) {
        console.error(`Error delete category name for ID ${id}`, error);
        throw error;
    }
};
