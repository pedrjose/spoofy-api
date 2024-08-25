export interface Session {
  id: number;
  dateCreated: number;
  username: string;
  issued: number;
  expires: number;
}

export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}