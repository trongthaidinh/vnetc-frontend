import httpRequest from '~/utils/httpRequest';

export const getConfiguration = async () => {
    try {
        const response = await httpRequest.get('/configuration');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};
