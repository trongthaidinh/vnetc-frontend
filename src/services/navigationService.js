import httpRequest from '~/utils/httpRequest';

export const getNavigationLinks = async () => {
    try {
        const response = await httpRequest.get('/navigation');
        return response.data;
    } catch (error) {
        console.error('Error fetching navigation links:', error);
        throw error;
    }
};

export const getChildNavigation = async (parentNavigationId) => {
    try {
        const response = await httpRequest.get(`/childNavigation?parentNavigationId=${parentNavigationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching child navigation:', error);
        throw error;
    }
};
