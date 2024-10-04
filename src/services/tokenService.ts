import { Document, Types } from "mongoose";

import userTokenModel from "../database/models/userTokenModel";
import { UserTokenModel } from "../interfaces/User";
import { UserToken } from "../types";

type UserTokenDoc = Document<unknown, NonNullable<unknown>, UserTokenModel> &
  Omit<
    UserTokenModel & {
      _id: Types.ObjectId;
    },
    never
  >;

const convertUserDocToUserToken = (userTokenDoc: UserTokenDoc) => {
  const userToken: UserToken = {
    userId: userTokenDoc.userId.toString(),
    token: userTokenDoc.token,
    createdAt: userTokenDoc.createdAt,
  };

  return userToken;
};

export const userTokenService = {
  create: async (userId: string, token: string): Promise<UserToken> => {
    const userTokenDoc = await userTokenModel.create({
      userId: new Types.ObjectId(userId),
      token,
    });

    return convertUserDocToUserToken(userTokenDoc);
  },

  findUserTokenByToken: async (token: string) => {
    const userTokenDoc = await userTokenModel.findOne({ token }).exec();

    if (!userTokenDoc) {
      return null;
    }

    return convertUserDocToUserToken(userTokenDoc);
  },

  removeUserTokenById: async (userId: string) => {
    const result = await userTokenModel
      .findOneAndDelete({
        userId: new Types.ObjectId(userId),
      })
      .exec();
    
    const userTokenDoc = result?.value;
    if (!userTokenDoc) {
      return null;
    }

    return convertUserDocToUserToken(userTokenDoc);
  },

  removeUserTokenByToken: async (token: string) => {
    const result = await userTokenModel.findOneAndDelete({ token }).exec();

    const userTokenDoc = result?.value;
    if (!userTokenDoc) {
      return null;
    }

    return convertUserDocToUserToken(userTokenDoc);
  },

  removeAllUserTokensById: async (userId: string) =>
    userTokenModel
      .deleteMany({
        userId: new Types.ObjectId(userId),
      })
      .exec(),
};