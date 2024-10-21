import { Document, Types } from "mongoose";

import userModel from "../database/models/userModel";
import { IPlaylist, IUserModel, ILyric } from "../interfaces/User";
import { User, UserRoles } from "../types";

type UserDoc = Document<unknown, NonNullable<unknown>, IUserModel> &
    Omit<
        IUserModel & {
            _id: Types.ObjectId;
        },
        never
    >;

interface UpdateUserParams {
    id: string;
    name?: string;
    password?: string;
    photo?: string;
    myPlaylists?: Array<IPlaylist>;
}

interface AddLyricToPlaylistParams {
    id: string;
    playlistId: string;
    lyrics: ILyric[];
}

const convertUserDocToUser = (userDoc: UserDoc) => {
    const user: User = {
        id: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        role: userDoc.role,
        photo: userDoc.photo,
        myPlaylists: userDoc.myPlaylists,
    };

    return user;
};


export const userService = {
    create: async (
        name: string,
        email: string,
        hashPassword: string,
        role: UserRoles,
        myPlaylists: Array<IPlaylist>,
    ): Promise<User> => {
        const userDoc = await userModel.create({
            name,
            email,
            password: hashPassword,
            role,
            myPlaylists,
        });

        return convertUserDocToUser(userDoc);
    },

    findUserByEmail: async (email: string) => {
        const userDoc = await userModel.findOne({ email }).select("+password").exec();

        if (!userDoc) {
            return null;
        }

        return convertUserDocToUser(userDoc);
    },

    findAllUsers: async () => {
        const userDoc = await userModel.find().exec();

        return userDoc.map(doc => convertUserDocToUser(doc));
    },

    findUserById: async (id: string) => {
        const userDoc = await userModel.findOne({ _id: new Types.ObjectId(id) }).exec();

        if (!userDoc) {
            return null;
        }

        return convertUserDocToUser(userDoc);
    },

    findAndUpdateUserById: async ({
        id,
        name,
        password,
        photo,
        myPlaylists,
    }: UpdateUserParams) => {
        const updateData: { [key: string]: string | Array<IPlaylist> } = {};

        if (name) {
            updateData.name = name;
        }

        if (password) {
            updateData.password = password;
        }

        if (photo) {
            updateData.photo = photo;
        }

        if (myPlaylists) {
            updateData.myPlaylists = myPlaylists;
        }

        if (name || password || photo || myPlaylists) {
            const row = await userModel
                .findOneAndUpdate({ _id: new Types.ObjectId(id) }, updateData, { returnDocument: "after" })
                .exec();
            if (row) {
                return convertUserDocToUser(row);
            }
        }

        return null;
    },

    updateLyricToUserPlaylist: async ({
        id,
        playlistId,
        lyrics,
    }: AddLyricToPlaylistParams) => {

        const updatedUserDoc = await userModel.findOneAndUpdate(
            { _id: new Types.ObjectId(id), "myPlaylists._id": new Types.ObjectId(playlistId) },
            { $set: { "myPlaylists.$.playlistLyrics": lyrics }},
            { returnDocument: "after" },
        ).exec();

        if (!updatedUserDoc) {
            return null;
        }

        return convertUserDocToUser(updatedUserDoc);
    },

    deleteUserById: async (id: string) => {
        const result = await userModel.findOneAndDelete({ _id: new Types.ObjectId(id) });

        const userDoc = result?.value;
        if (!userDoc) {
            return null;
        }

        return convertUserDocToUser(userDoc);
    },
}
