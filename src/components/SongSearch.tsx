import React, { useContext } from 'react';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';
import { FaRegPauseCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { twMerge } from 'tailwind-merge';
import { convertSecondToMinute } from '../utils';
import { AiOutlineHeart } from 'react-icons/ai';

interface IProps {
  song: SongSearchType;
  index: number;
}

const SongSearch: React.FC<IProps> = ({ song, index }) => {
  const { handleChooseAudio, audioCurrent } = useContext(
    AudioContext
  ) as AudioContextType;
  const isCurrent = song.id === audioCurrent?.id;

  return (
    <div
      className={'grid grid-cols-4 items-center cursor-pointer'}
      // onClick={() => handleChooseAudio(song)}
    >
      <div className={'flex items-center'}>
        <p className={'text-white font-semibold mr-3'}>
          {isCurrent ? (
            <FaRegPauseCircle
              className={'text-secondary font-bold'}
              size={20}
            />
          ) : (
            index
          )}
        </p>
        <LazyLoadImage
          src={`https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/${song.thumb}`}
          alt=""
          className={'w-[40px] h-[40px] object-cover rounded mr-3'}
        />
        <p
          className={twMerge(
            'text-white font-semibold text-[#afb6b2]',
            isCurrent && 'text-secondary'
          )}
        >
          {song.name}
        </p>
      </div>
      <p
        className={twMerge(
          'text-white font-semibold text-[#7a857f]',
          isCurrent && 'text-secondary'
        )}
      >
        {/*{song}*/}
      </p>
      <p
        className={twMerge(
          'text-white font-semibold text-[#7a857f]',
          isCurrent && 'text-secondary'
        )}
      >
        {/*{song.album?.name}*/}
      </p>
      <div className={'flex-center gap-2.5'}>
        <p
          className={twMerge(
            'text-[#afb6b2] font-semibold',
            isCurrent && 'text-secondary'
          )}
        >
          {/*{convertSecondToMinute(song.duration)}*/}
        </p>
        <button>
          <AiOutlineHeart
            className={twMerge('text-[#afb6b2]', isCurrent && 'text-secondary')}
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

export default SongSearch;
