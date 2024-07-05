import httpRequest from '~/utils/httpRequest';

export const getPageContent = async (slug) => {
    try {
        const response = await httpRequest.get(`/page-content/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching page content:', error);
        throw error;
    }
};
