import httpRequest from '~/utils/httpRequest';

export const getProjects = async () => {
    try {
        const response = await httpRequest.get('/videos');
        return response.data.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
