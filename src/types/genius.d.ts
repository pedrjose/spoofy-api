declare module 'genius-lyrics-api' {
    interface Options {
      apiKey: string;
      title: string;
      artist: string;
      optimizeQuery?: boolean;
      authHeader?: boolean;
    }
  
    interface GetSongByIdOptions {
      id: number | string;
      apiKey: string;
    }
  
    interface Song {
      id: number;
      title: string;
      url: string;
      lyrics: string;
      albumArt: string;
    }
  
    export function getLyrics(
      options: Omit<Options, 'authHeader'> | string
    ): Promise<string>;
  
    export function getSong(
      options: Omit<Options, 'authHeader'>
    ): Promise<Song | null>;
  
    export function searchSong(
      options: Options
    ): Promise<Omit<Song, 'lyrics'>[] | null>;
  
    export function getSongById(options: GetSongByIdOptions): Promise<Song>;
  
    export function getAlbumArt(
      options: Omit<Options, 'authHeader'>
    ): Promise<string | null>;
  }