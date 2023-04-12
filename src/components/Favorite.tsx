import React from 'react';
import useFavorite from '../hooks/useFavorite';
import SongSkeleton from './SongSkeleton';
import Song from './Song';

interface IProps {}

const Favorite: React.FC<IProps> = () => {
  const { favorite } = useFavorite();

  return (
    <>
      <div className={'mt-5'}>
        <p className={'text-white font-semibold text-lg'}>Bảng xếp hạng</p>
        <div className={'flex flex-col overflow-x-hidden gap-5 mt-5'}>
        </div>
      </div>
    </>
  );
};

export default Favorite;
