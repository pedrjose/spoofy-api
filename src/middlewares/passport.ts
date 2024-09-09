import { Request } from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import { tokenBlockListService } from "../services/tokenBlockListService";
import { messages } from "../messages";
import { config, loadConfigVariables } from "../config";
import { userService } from "../services/userService";
import { JwtPayload } from "../types";
import { logger } from "../helpers";

loadConfigVariables();

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email: any, password: any, done: any) => {
            try {
                const user = await userService.findUserByEmail(email);

                if (!user) {
                    logger.error("Invalid email or password");
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    logger.error("Invalid email or password");
                    return done(null, false, {
                        message: "Invalid email or password",
                    });
                }

                return done(null, user);
            } catch (err) {
                logger.error(err);
                return done(err);
            }
        },
    ),
);

passport.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.accessTokenPrivateKey,
            passReqToCallback: true,
        },
        async (req: Request, jwtPayload: JwtPayload, done: VerifiedCallback) => {
            try {
                const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

                if (accessToken) {
                    const isBlocked = await tokenBlockListService.isTokenBlocked(accessToken);

                    if (isBlocked) {
                        logger.error(messages.NOT_LOGGED);
                        return done(null, false, {
                            message: messages.NOT_LOGGED,
                        });
                    }
                }
            } catch (err) {
                logger.error(err);
                return done(err, false);
            }

            return done(null, jwtPayload);
        },
    ),
);

const cookieExtractor = (req: Request) => {
    const refreshToken = req.cookies[config.refreshTokenName];

    if (!refreshToken) {
        return null;
    }

    return refreshToken;
};

passport.use(
    "jwt-refresh",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: config.refreshTokenPrivateKey,
        },
        async (jwtPayload: JwtPayload, done: VerifiedCallback) => done(null, jwtPayload),
    ),
);

export default passport.initialize();