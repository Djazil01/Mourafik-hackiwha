import { RequestUser } from "../user";
export { };
declare global {
  namespace Express {
    export interface Request {
      user: RequestUser | null;
    }
  }
}
