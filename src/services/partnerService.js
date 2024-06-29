import httpRequest from '~/utils/httpRequest';

export const getPartners = async () => {
    try {
        const response = await httpRequest.get('/partners');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
