/// <reference path="../types/genius.d.ts" />
import { getSong } from 'genius-lyrics-api';

import { config } from "../config";

export const geniusRequest = async (music: string, artist: string) => {
    try {
        const options = {
            apiKey: config.GeniusApiKey,
            title: music,
            artist: artist,
            optimizeQuery: true
        };

        const lyric = await getSong(options);
        
        return lyric
    } catch (err) {
        const error = err as Error;

        return {
            success: false,
            message: 'Error fetching data from Genius API',
            error: error.message || error
        };
    }
};
