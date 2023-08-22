import { Session, EncodeResult } from "../Interfaces/Session";

export type PartialSession = Omit<Session, "issued" | "expires">;

export type DecodeResult =
  | {
      type: "valid";
      session: Session;
    }
  | {
      type: "integrity-error";
    }
  | {
      type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";
