import httpRequest from '~/utils/httpRequest';

export const getNavigationLinks = async () => {
    try {
        const response = await httpRequest.get('/category');
        return response.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};
