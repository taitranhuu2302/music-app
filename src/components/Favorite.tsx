import React, { useMemo } from 'react';
import useFavorite from '../hooks/useFavorite';
import SongSkeleton from './SongSkeleton';
import Song from './Song';
import { useAppSelector } from '../redux/hooks';

interface IProps {}

const Favorite: React.FC<IProps> = () => {
  const { favorite } = useFavorite();
  const { keyword } = useAppSelector((state) => state.search);

  const renderFavorite = useMemo(() => {
    return (
      <>
        {favorite.map((song, index) => {
          if (song.name.toLowerCase().includes(keyword.toLowerCase())) {
            return (
              <div key={song.id}>
                <Song index={index + 1} song={song} />
              </div>
            );
          }
          return null;
        })}
      </>
    );
  }, [keyword]);

  return (
    <>
      <div className={'mt-5'}>
        <p className={'text-white font-semibold text-lg'}>Yêu thích</p>
        <div className={'flex flex-col overflow-x-hidden gap-5 mt-5'}>
          {renderFavorite}
        </div>
      </div>
    </>
  );
};

export default Favorite;
