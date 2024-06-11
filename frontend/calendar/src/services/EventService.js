import axios from "axios";

const EVENTS_URL = 'http://localhost:8081/api/events';

export const findAllEvents = async () => {
    try {
        const response = await axios.get(EVENTS_URL);
        return response;
    } catch (error) { 
        console.log(error);
    }
    return null;
}

export const createEvent = async ({ title, message, startDate, endDate, start, end }) => {
    try {
        const response = await axios.post(EVENTS_URL, {
            title,
            message,
            startDate,
            endDate,
            start,
            end
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const updateEvent = async ({ title, message, startDate, endDate, start, end }) => {
    try {
        const response = await axios.put(`${EVENTS_URL}/${id}`, {
            title,
            message,
            startDate,
            endDate,
            start,
            end
        });
        return response;
    } catch (error) {
        console.log(error);
    }
    return undefined;
}

export const removeEvent = async (id) => {

    try {
        await axios.delete(`${EVENTS_URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
}

