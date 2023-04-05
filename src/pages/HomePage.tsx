import React, { useContext, useEffect, useRef } from 'react';
import Song from '../components/Song';
import AppLayout from '../layouts/AppLayout';
import { useGetCharts } from '../services';
import SongSkeleton from '../components/SongSkeleton';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';

interface IProps {}

const HomePage: React.FC<IProps> = () => {
  const { data, isLoading } = useGetCharts();
  const songRefs = useRef<(HTMLDivElement | null)[]>([]);
  // const { data: search } = useSearch();
  // console.log(search);

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
    <>
      <AppLayout>
        <div className={'mt-5'}>
          <p className={'text-white font-semibold text-lg'}>Recently Played</p>
          <div className={'flex flex-col gap-5 mt-5'}>
            {isLoading
              ? Array(10)
                  .fill(0)
                  .map((_, index) => <SongSkeleton key={index} />)
              : data?.data.song.map((song, index) => {
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
      </AppLayout>
    </>
  );
};

export default HomePage;
