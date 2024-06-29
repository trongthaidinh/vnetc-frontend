import httpRequest from '~/utils/httpRequest';

export const getTeams = async () => {
    try {
        const response = await httpRequest.get('/teams');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};
