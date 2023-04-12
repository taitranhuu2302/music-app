import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useGetCharts } from '../services';
import { useAppSelector } from '../redux/hooks';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';
import SongSkeleton from './SongSkeleton';
import Song from './Song';

interface IProps {}

const Charts: React.FC<IProps> = () => {
  const { data, isLoading } = useGetCharts();
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { keyword } = useAppSelector((state) => state.search);

  const songs = useMemo((): SongType[] => {
    let result: SongType[] = [];

    if (!data) return result;

    result = data.data.song.filter((item) => item.name.includes(keyword));

    return result;
  }, [data, keyword]);
  
  const { audioCurrent } = useContext(AudioContext) as AudioContextType;

  useEffect(() => {
    if (audioCurrent) {
      // Tìm phần tử HTML của bài hát hiện tại
      const currentSongRef = songRefs.current.find(
        (ref) => ref && ref.id === `song-${audioCurrent.id}`
      );

      // Cuộn đến phần tử bài hát đó
      if (currentSongRef) {
        currentSongRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [audioCurrent]);

  return (
    <div className={'mt-5'}>
      <p className={'text-white font-semibold text-lg'}>Bảng xếp hạng</p>
      <div className={'flex flex-col overflow-x-hidden gap-5 mt-5'}>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => <SongSkeleton key={index} />)
          : songs.map((song, index) => {
              return (
                <div
                  id={`song-${song.id}`}
                  ref={(el) => {
                    songRefs.current[index] = el;
                  }}
                  key={song.id}
                >
                  <Song index={index + 1} song={song} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Charts;