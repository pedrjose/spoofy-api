import { UserRoles } from "types/user";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: UserRoles;
      tokenExp?: number;
    }
  }
}

export {};