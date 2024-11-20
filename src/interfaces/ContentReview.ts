export interface IContentReview extends Document {
    musicId: string;
    title: string;
    image: string;
    url: string;
    views: number;
    likes: number;
    dislikes: number;
    createdAt: Date;
}

export interface IContentReviewPlaylist {
    musicReviewId: string;
    title: string;
    image: string;
    url: string;
}

export interface ILyricReturn {
    id: number,
    title: string,
    lyrics: string,
    url: string,
    albumArt: string,
}

export interface IGeniusError {
    success: boolean;
    message: string;
    error: string | Error;
}