import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface IProps {}

const SongSkeleton: React.FC<IProps> = () => {
  return (
    <div className={'grid grid-cols-4 items-center cursor-pointer'}>
      <div className={'flex items-center gap-2.5'}>
        <Skeleton width={20} />
        <Skeleton width={50} height={50} />
        <Skeleton width={200} count={2} />
      </div>
      <Skeleton width={200} count={1} />
      <Skeleton width={200} count={1} />
      <Skeleton width={200} count={1} />
    </div>
  );
};

export default SongSkeleton;
