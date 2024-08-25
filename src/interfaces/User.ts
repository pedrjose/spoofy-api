export interface IUser {
  email: string;
  avatar: string;
  password: string;
  myPlaylists: IPlaylist[];
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
  playlistId: string;
  playlistName: string;
  playlistLyrics: ILyric[];
}
