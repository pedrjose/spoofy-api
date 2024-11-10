import { Document, Types } from "mongoose";

import lyricReviewModel from "../database/models/lyricReviewModel";
import { IContentReview  } from "../interfaces/ContentReview";
import { ContentReview } from "../types";

type ContentReviewDoc = Document<unknown, NonNullable<unknown>, IContentReview> &
    Omit<
        IContentReview & {
            _id: Types.ObjectId;
        },
        never
    >;

interface UpdateContentReviewParams {
    id: string;
    musicId?: string,
    image?: string,
    url?: string,
}

const convertContentReviewDocToContentReview = (contentReviewDoc: ContentReviewDoc) => {
    const contentReview: ContentReview = {
        id: contentReviewDoc._id.toString(),
        musicId: contentReviewDoc.musicId,
        image: contentReviewDoc.image,
        url: contentReviewDoc.url,
        views: contentReviewDoc.views,
        likes: contentReviewDoc.likes,
        dislikes: contentReviewDoc.dislikes,
    };

    return contentReview;
};


export const contentReviewService = {
    create: async (
        musicId: string,
        image: string,
        url: string,
    ): Promise<ContentReview> => {
        const contentReviewDoc = await lyricReviewModel.create({
            musicId,
            image,
            url,
        });

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },

    findContentReviewById: async (id: string) => {
        const contentReviewDoc = await lyricReviewModel.findOne({ _id: new Types.ObjectId(id) }).exec();

        if (!contentReviewDoc) {
            return null;
        }

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },

    findAllContentReview: async () => {
        const contentReviewDoc = await lyricReviewModel.find().exec();

        return contentReviewDoc.map(doc => convertContentReviewDocToContentReview(doc));
    },

    findAllContentReviewWithPagination: async (page: number = 1, limit: number = 10) => {
        const skip = (page - 1) * limit;
    
        const contentReviewDoc = await lyricReviewModel.find().skip(skip).limit(limit).exec();
    
        return contentReviewDoc.map(doc => convertContentReviewDocToContentReview(doc));
    },
    

    findTop10ContentReview: async () => {
        const contentReviewDoc = await lyricReviewModel.find().sort({ likes: -1, views: -1 }).limit(10).exec();

        return contentReviewDoc.map(doc => convertContentReviewDocToContentReview(doc));
    },

    findAndUpdateContentReviewById: async ({
        id,
        musicId,
        image,
        url,
    }: UpdateContentReviewParams) => {
        const updateData: { [key: string]: string } = {};

        if (musicId) {
            updateData.musicId = musicId;
        }

        if (image) {
            updateData.image = image;
        }

        if (url) {
            updateData.url = url;
        }

        if (musicId || image || url) {
            const row = await lyricReviewModel
                .findOneAndUpdate({ _id: new Types.ObjectId(id) }, updateData, { returnDocument: "after" })
                .exec();
            if (row) {
                return convertContentReviewDocToContentReview(row);
            }
        }

        return null;
    },

    deleteContentReviewById: async (id: string) => {
        const result = await lyricReviewModel.findOneAndDelete({ _id: new Types.ObjectId(id) });

        const contentReviewDoc = result?.value;
        if (!contentReviewDoc) {
            return null;
        }

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },

    incrementViews: async (id: string) => {
        const contentReviewDoc = await lyricReviewModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });

        if (!contentReviewDoc) {
            return null;
        }

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },

    incrementLikes: async (id: string) => {
        const contentReviewDoc = await lyricReviewModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

        if (!contentReviewDoc) {
            return null;
        }

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },

    incrementDislikes: async (id: string) => {
        const contentReviewDoc = await lyricReviewModel.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, { new: true });

        if (!contentReviewDoc) {
            return null;
        }

        return convertContentReviewDocToContentReview(contentReviewDoc);
    },
}
