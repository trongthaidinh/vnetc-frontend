import httpRequest from '~/utils/httpRequest';

export const getProducts = async () => {
    try {
        const response = await httpRequest.get('/products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
