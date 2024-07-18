import httpRequest from '~/utils/httpRequest';

export const getImages = async () => {
    try {
        const response = await httpRequest.get('/image');
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
