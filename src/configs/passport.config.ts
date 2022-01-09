import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { Application } from 'express';
import User from '../app/users/user.entity';

export const initPassport = (app: Application): void => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: "/google/callback"
    },
        async (accessToken, refreshToken, { id, displayName, photos, emails }, done): Promise<void> => {
            const newUser = {
                google_id: id,
                name: displayName,
                username: emails && emails[0].value.split('@')[0],
                image: photos && photos[0].value,
                email: emails && emails[0].value
            };

            try {
                let user = await User.findOne({ where: { google_id: newUser.google_id } });

                if (!user) user = await (await User.create(newUser)).save();

                return done(null, user.google_id);
            } catch (error: any) {
                console.log(error.message);
                return done(error, undefined);
            }
        }
    ));

    passport.serializeUser((google_id, done) => {
        done(null, google_id);
    });

    passport.deserializeUser(async (google_id, done) => {
        try {
            const user = await User.findOne({ where: { google_id } });
            done(null, user);
        } catch (error) {
            done(error, null)
        }
    });
}

