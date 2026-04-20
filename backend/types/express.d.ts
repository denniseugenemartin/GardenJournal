import { IDatabase } from "pg-promise";

declare global {
  namespace Express {
    interface Request {
      db: IDatabase<any>;
    }
  }
}

export { };

