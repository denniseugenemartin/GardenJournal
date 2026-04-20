import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { IDatabase } from "pg-promise";

// Define the type for passReqToCallback
type GoogleVerifyCallback = (
  req: express.Request,
  accessToken: string,
  refreshToken: string,
  profile: { id: string; displayName: string; emails?: { value: string }[] },
  done: (err: any, user?: any) => void,
) => void | Promise<void>;

export default function setupGoogleStrategy(db: IDatabase<any>) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
        passReqToCallback: true,
      },
      async function (
        req: express.Request,
        accessToken: string,
        refreshToken: string,
        profile,
        done,
      ) {
        try {
          const user = await db.oneOrNone(
            "SELECT * FROM users WHERE google_id = $1",
            [profile.id],
          );

          if (user) return done(null, user);

          const newUser = await db.one(
            `INSERT INTO users (name, email, google_id)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [profile.displayName, profile.emails?.[0]?.value, profile.id],
          );

          return done(null, newUser);
        } catch (err) {
          done(err as Error);
        }
      } as GoogleVerifyCallback,
    ),
  );

  // Passport session
  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      done(null, user);
    } catch (err) {
      done(err as Error, null);
    }
  });
}
