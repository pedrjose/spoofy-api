export interface IUser {
  email: string;
  password: string;
  avatar: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILyric {
  artist: string;
  musicName: string;
  musicLyric: string;
  translate: string;
  badwords: string;
}

export interface IPlaylist {
  playlistName: string;
  playlistLyrics: ILyric[];
}