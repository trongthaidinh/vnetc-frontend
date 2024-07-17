import httpRequest from '~/utils/httpRequest';

export const getProducts = async () => {
    try {
        const response = await httpRequest.get('/product');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await httpRequest.get(`/product/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching product detail with id ${id}:`, error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await httpRequest.get(`/product?category_id=${categoryId}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching products for category id=${categoryId}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await httpRequest.post('/product', productData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await httpRequest.patch(`/product/${id}`, productData);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await httpRequest.delete(`/product/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};
