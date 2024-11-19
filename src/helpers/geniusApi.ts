/// <reference path="../types/genius.d.ts" />
import { getSong, getSongById } from 'genius-lyrics-api';
import { ILyricReturn } from 'interfaces/ContentReview';

import { config } from "../config";



export const geniusRequest = async (music: string, artist: string) => {
    try {
        const options = {
            apiKey: config.GeniusApiKey,
            title: music,
            artist: artist,
            optimizeQuery: true
        };

        const lyric : ILyricReturn | null  = await getSong(options);
        
        return lyric;
    } catch (err) {
        const error = err as Error;

        return {
            success: false,
            message: 'Error fetching data from Genius API',
            error: error.message || error
        };
    };
};


export const geniusRequestById = async (lyricId: string) => {
    try {
        const options = {
            id: lyricId,
            apiKey: config.GeniusApiKey
        };

        const lyric : ILyricReturn | null = await getSongById(lyricId, config.GeniusApiKey);
        
        return lyric;
    } catch (err) {
        const error = err as Error;

        return {
            success: false,
            message: 'Error fetching data from Genius API',
            error: error.message || error
        };
    };
};