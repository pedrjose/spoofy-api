import { IPlaylist } from "../interfaces/User";

export const USER_ROLES = ["admin", "user"] as const;

export type UserRoles = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  photo?: string;
  myPlaylists: Array<IPlaylist>;
}