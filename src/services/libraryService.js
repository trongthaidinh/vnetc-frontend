import httpRequest from '~/utils/httpRequest';

export const getImages = async (page = 1, limit = 9) => {
    try {
        const response = await httpRequest.get(`/image?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching image', error);
        throw error;
    }
};

export const getVideos = async () => {
    try {
        const response = await httpRequest.get('/video');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching video', error);
        throw error;
    }
};
