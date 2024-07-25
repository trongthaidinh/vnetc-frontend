import httpRequest from '~/utils/httpRequest';

export const getMessages = async () => {
    try {
        const response = await httpRequest.get('/contact?limit');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const createMessage = async (data) => {
    const name = data.fullName;
    const email = data.email;
    const phone = data.phoneNumber;
    const title = data.subject;
    const content = data.message;
    try {
        const response = await httpRequest.post('/contact', { name, email, phone, title, content });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};

export const deleteMessage = async (id) => {
    try {
        const response = await httpRequest.delete(`/contact/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching configuration', error);
        throw error;
    }
};
