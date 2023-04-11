import React from 'react';

interface ISongItem {
  song?: SongDataType;
}

const SongItem = ({ song }: ISongItem) => {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <div className={'w-[400px] h-[400px]'}>
        <img
          src={
            song?.album.thumbnailMedium ??
            'https://photo-resize-zmp3.zmdcdn.me/'
          }
          alt=""
          className={'object-cover w-full h-full rounded-lg'}
        />
      </div>
      <div className={'flex-center mt-5 flex flex-col'}>
        <p className={'text-[24px] font-bold text-white'}>{song?.name}</p>
        <p className={'text-[14px] mb-1 text-[hsla(0,0%,100%,.8)]'}>
          {song?.artistsNames}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
