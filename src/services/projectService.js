import httpRequest from '~/utils/httpRequest';

export const getProjects = async () => {
    try {
        const response = await httpRequest.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
