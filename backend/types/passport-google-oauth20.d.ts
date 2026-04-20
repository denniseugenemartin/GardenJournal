import { Strategy as PassportStrategy } from "passport";

declare module "passport-google-oauth20" {
  export class Strategy extends PassportStrategy {
    constructor(
      options: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        passReqToCallback?: boolean;
      },
      verify: (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err: any, user?: any) => void,
      ) => void,
    );
  }
}
