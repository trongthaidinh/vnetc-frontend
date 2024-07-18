import httpRequest from '~/utils/httpRequest';

export const getImagesPagination = async (page = 1, limit = 9) => {
    try {
        const response = await httpRequest.get(`/image?page=${page}&limit=${limit}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching images', error);
        throw error;
    }
};

export const getImages = async () => {
    try {
        const response = await httpRequest.get('/image');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching images', error);
        throw error;
    }
};

export const createImage = async (imageData) => {
    try {
        const response = await httpRequest.post('/image', imageData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding image', error);
        throw error;
    }
};

export const updateImage = async (imageId, updatedData) => {
    try {
        const response = await httpRequest.put(`/image/${imageId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating image', error);
        throw error;
    }
};

export const deleteImage = async (imageId) => {
    try {
        const response = await httpRequest.delete(`/image/${imageId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting image', error);
        throw error;
    }
};

export const getVideos = async () => {
    try {
        const response = await httpRequest.get('/video');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos', error);
        throw error;
    }
};

export const getVideosPaginnation = async () => {
    try {
        const response = await httpRequest.get('/video');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching videos', error);
        throw error;
    }
};

export const createVideo = async (videoData) => {
    try {
        const response = await httpRequest.post('/video', videoData);
        return response.data.data;
    } catch (error) {
        console.error('Error adding video', error);
        throw error;
    }
};

export const updateVideo = async (videoId, updatedData) => {
    try {
        const response = await httpRequest.put(`/video/${videoId}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating video', error);
        throw error;
    }
};

export const deleteVideo = async (videoId) => {
    try {
        const response = await httpRequest.delete(`/video/${videoId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting video', error);
        throw error;
    }
};
