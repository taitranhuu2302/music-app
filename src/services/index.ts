import { useQuery } from 'react-query';
import axiosConfig from '../configs/AxiosConfig';

export const useGetCharts = () => {
  return useQuery(
    ['GET_CHARTS'],
    (): Promise<ResponseSuccess<SongsType>> =>
      axiosConfig.get(
        `https://mp3.zing.vn/xhr/chart-realtime?songId=0&videoId=0&albumId=0&chart=song&time=-1`
      )
  );
};

export const useGetData = (
  code?: string,
  onSuccess?: (data: SongDataType) => void
) => {
  return useQuery(
    ['GET_DATA_INFORMATION', code],
    (): Promise<ResponseSuccess<SongDataType>> =>
      axiosConfig.get(
        `https://corsproxy.io/?${encodeURIComponent(
          'https://mp3.zing.vn/xhr/media/get-source?type=audio&key=' + code
        )}`
      ),
    {
      enabled: !!code,
      onSuccess: (data) => {
        onSuccess && onSuccess(data.data);
      },
    }
  );
};

export const useSearch = (keyword: string) => {
  return useQuery(
    ['SEARCH_AUDIO', keyword],
    () =>
      axiosConfig.get(
        `https://corsproxy.io/?${encodeURIComponent(
          `http://ac.mp3.zing.vn/complete?type=artist,song,key,code&num=10&query=${keyword}`
        )}`
      ),
    {
      enabled: !!keyword,
    }
  );
};

export const useGetLyric = (url?: string, onSuccess?: (data: any) => void) => {
  return useQuery(['GET_LYRIC_FROM_MUSIC', url], () => axiosConfig.get(url!), {
    enabled: !!url,
    onSuccess: onSuccess && onSuccess,
  });
};
