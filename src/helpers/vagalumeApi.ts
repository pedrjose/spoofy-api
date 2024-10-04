import axios from 'axios';

import { config } from "../config";

export const vagalumeRequest = async (url: string) => {
    try {
        const response = await axios.post(`${url}&apikey=${config.vagalumeApiKey}`);
        
        if (response.status === 200 && response.data) {
            return {
                status: response.status,
                data: response.data,
            };
        } else {
            return {
                status: response.status,
                message: 'Error fetching data from Vagalume API',
                error: response.data,
            };
        }
    } catch (err) {
        const error = err as Error;

        return {
            success: false,
            message: 'Error fetching data from Vagalume API',
            error: error.message || error
        };
    }
};
