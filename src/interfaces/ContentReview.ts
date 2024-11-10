export interface IContentReview extends Document {
    musicId: string;
    image: string;
    url: string;
    views: number;
    likes: number;
    dislikes: number;
    createdAt: Date;
}

export interface IContentReviewPlaylist {
    musicId: string;
    image: string;
    url: string;
}