import httpRequest from '~/utils/httpRequest';

export const getServices = async () => {
    try {
        const response = await httpRequest.get('/services');
        return response.data;
    } catch (error) {
        console.error('Error fetching services', error);
        throw error;
    }
};
