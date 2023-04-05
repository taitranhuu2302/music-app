type ResponseSuccess<T> = {
  err: number;
  msg: string;
  data: T;
  timestamp: number;
};

type SongDataType = {
  id: string;
  name: string;
  title: string;
  code: string;
  contentOwner: number;
  isoffical: boolean;
  isWorldWide: boolean;
  playlistId: string;
  artists: Artist[];
  artistsNames: string;
  performer: string;
  type: string;
  link: string;
  lyric: string;
  thumbnail: string;
  mvLink: string;
  duration: number;
  source: Source;
  album: Album;
  artist: Artist3;
  ads: boolean;
  isVip: boolean;
  ip: string;
};

type Source = {
  '128': string;
  '320': string;
};

type SongsType = {
  song: SongType[];
  customied: any[];
  peakScore: number;
  songHis: SongHis;
};

type SongType = {
  id: string;
  name: string;
  title: string;
  code: string;
  contentOwner: number;
  isoffical: boolean;
  isWorldWide: boolean;
  playlistId?: string;
  artists: Artist[];
  artistsNames: string;
  performer: string;
  type: string;
  link: string;
  lyric: string;
  thumbnail: string;
  duration: number;
  total: number;
  rankNum: any;
  rankStatus: string;
  artist?: Artist2;
  position: number;
  order: any;
  album?: Album;
  mvLink?: string;
};

type Artist = {
  name: string;
  link: string;
};

type Artist2 = {
  id: string;
  name: string;
  link: string;
  cover: string;
  thumbnail: string;
};

type Album = {
  id: string;
  link: string;
  title: string;
  name: string;
  isoffical: boolean;
  artistsNames: string;
  artists: Artist3[];
  thumbnail: string;
  thumbnailMedium: string;
};

type Artist3 = {
  name: string;
  link: string;
};

type SongHis = {
  minScore: number;
  maxScore: number;
  from: number;
  interval: number;
  data: Data2;
  score: Score;
  totalScore: number;
};

type Data2 = {
  Z677ODE7: Z677Ode7[];
  Z67CFZDA: Z67Cfzda[];
  Z6708WAZ: Z6708Waz[];
};

type Z677Ode7 = {
  time: number;
  hour: string;
  counter: number;
};

type Z67Cfzda = {
  time: number;
  hour: string;
  counter: number;
};

type Z6708Waz = {
  time: number;
  hour: string;
  counter: number;
};

type Score = {
  Z677ODE7: Z677Ode72;
  Z67CFZDA: Z67Cfzda2;
  Z6708WAZ: Z6708Waz2;
};

type Z677Ode72 = {
  totalScore: number;
  totalPeakScore: number;
  totalScoreRealtime: number;
};

type Z67Cfzda2 = {
  totalScore: number;
  totalPeakScore: number;
  totalScoreRealtime: number;
};

type Z6708Waz2 = {
  totalScore: number;
  totalPeakScore: number;
  totalScoreRealtime: number;
};
