import axios from "axios";

export async function updateUserData(userId, userData) {
    try {
        const response = await axios.put(`/api/user/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserPassword(userId, passwordData) {
    try {
        const response = await axios.put(`/api/user/${userId}/password`, passwordData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserAvatar(userId, avatarData) {
    try {
        const response = await axios.put(`/api/user/${userId}/avatar`, avatarData);
        return response.data;
    } catch (error) {
        throw error;
    }
}
