import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaRandom } from 'react-icons/fa';
import {
  AiFillHeart,
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillStepBackward,
  AiFillStepForward,
} from 'react-icons/ai';
import { ImLoop } from 'react-icons/im';
import Slider from './Slider/Slider';
import { HiVolumeUp } from 'react-icons/hi';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';
import { convertSecondToMinute } from '../utils';
import { twMerge } from 'tailwind-merge';
import VolumeSlider from './Slider/VolumeSlider';
import { useClickOutside } from '../hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateCurrentTime } from '../redux/features/AudioSlice';
import { TbListDetails } from 'react-icons/all';
import AudioModal from './Modal/AudioModal';
import { Tooltip } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';

interface IProps {}

const Control: React.FC<IProps> = () => {
  const {
    sourceCurrent,
    audioCurrent,
    handleChooseSong,
    isRandom,
    isLoop,
    setVolume,
    setIsWaiting,
    volume,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
  } = useContext(AudioContext) as AudioContextType;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTime, currentTimeTemp } = useAppSelector(
    (state) => state.audio
  );
  const [openAudioModal, setOpenAudioModal] = useState(false);
  const dispatch = useAppDispatch();
  const [openVolume, setOpenVolume] = useState(false);
  const volumeRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const audio = audioRef.current;
    if (!sourceCurrent || !audio) return;

    audio.src = sourceCurrent.source['128'];
    setDuration(sourceCurrent.duration);
    audio.controls = false;
    audio.autoplay = true;
    audio.volume = volume;
    audio.setAttribute('crossorigin', 'anonymous');
  }, [sourceCurrent]);

  useEffect(() => {
    if (currentTimeTemp !== 0) {
      handleChangeTime(currentTimeTemp);
    }
  }, [currentTimeTemp]);

  const handleChangeTime = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    dispatch(updateCurrentTime(time));
  }, []);

  const onToggleModalAudio = (isOpen: boolean) => {
    setOpenAudioModal(isOpen);
    if (isOpen) {
      setSearchParams({
        state: 'show-lyric',
      });
      return;
    }

    setSearchParams({});
  };

  useEffect(() => {
    if (currentTime >= duration - 1) {
      if (!isLoop && isRandom) {
        handleChooseSong('RANDOM');
      } else {
        handleChooseSong('NEXT');
      }
    }
  }, [currentTime, isRandom, isLoop]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const state = searchParams.get('state');
    if (state) {
      setOpenAudioModal(true);
    }
  }, []);

  useClickOutside(volumeRef, () => {
    setOpenVolume(false);
  });

  return (
    <div
      className={
        'fixed h-[75px] w-full border-t border-[#7a857f] bottom-0 left-0 bg-[#130c1c] grid grid-cols-12 px-2.5 gap-2.5'
      }
    >
      <audio
        loop={isLoop}
        ref={audioRef}
        onLoadedData={() => {
          setIsWaiting(false);
        }}
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime === duration) {
            dispatch(updateCurrentTime(0));
          } else {
            dispatch(updateCurrentTime(e.currentTarget.currentTime));
          }
        }}
        onPlaying={() => {
          setIsWaiting(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />
      <ControlActions isHidden={true} handleTogglePlay={handleTogglePlay} />
      <div className={'col-span-10 md:col-span-6 lg:col-span-8 text-white flex items-center gap-10'}>
        <img
          src={
            audioCurrent?.thumbnail ||
            'https://static-zmp3.zadn.vn/skins/common/logo600.png'
          }
          alt=""
          className={'w-[50px] h-[50px] object-cover rounded'}
        />
        <div className={'flex-grow flex flex-col'}>
          <div className={'mb-2 flex-center gap-2.5'}>
            <p className={'text-center text-lg font-semibold'}>
              {sourceCurrent?.name}
            </p>
            <div className={'w-[5px] h-[5px] rounded-full bg-[#CACECC]'}></div>
            <p className={'font-semibold text-[#AFB6B2]'}>
              {sourceCurrent?.artistsNames}
            </p>
          </div>
          <div className={'flex items-center gap-5'}>
            <p className={'text-sm'}>
              {convertSecondToMinute(Number(currentTime.toFixed(0)))}
            </p>
            <Slider
              values={[currentTime]}
              setValues={(n: number[]) => {
                const value = n[0];
                dispatch(updateCurrentTime(value));
                handleChangeTime(value);
              }}
              max={duration}
            />
            <p className={'text-sm'}>{convertSecondToMinute(duration)}</p>
          </div>
        </div>
      </div>
      <div className={'lg:col-span-2 md:col-span-3 col-span-2 text-white flex-center gap-3'}>
        <Tooltip content={'Lời bài hát'}>
          <button onClick={() => onToggleModalAudio(true)}>
            <TbListDetails size={25} />
          </button>
        </Tooltip>
        <Tooltip content={'Thêm vào danh sách yêu thích'}>
          <button className={'hidden md:block'}>
            <AiFillHeart size={25} />
          </button>
        </Tooltip>
        <div className={'relative top-[2px] hidden md:block'} ref={volumeRef}>
          <div  className={'absolute bottom-[45px]'}>
            <VolumeSlider
              values={[volume]}
              open={openVolume}
              setValues={(n) => {
                const audio = audioRef.current;
                if (!audio) return;
                setVolume(n[0]);
                audio.volume = n[0];
              }}
            />
          </div>
          <Tooltip content={'Âm thanh'}>
            <button onClick={() => setOpenVolume(!openVolume)}>
              <HiVolumeUp size={25} />
            </button>
          </Tooltip>
        </div>
      </div>
      <AudioModal
        open={openAudioModal}
        onClose={() => onToggleModalAudio(false)}
        handleChangeTime={handleChangeTime}
        handleTogglePlay={handleTogglePlay}
      />
    </div>
  );
};

interface IControlActions {
  handleTogglePlay: () => void;
  isHidden?: boolean;
}

export const ControlActions = ({ handleTogglePlay, isHidden = false }: IControlActions) => {
  const {
    handleChooseSong,
    isRandom,
    isLoop,
    setIsLoop,
    setIsRandom,
    isPlaying,
  } = useContext(AudioContext) as AudioContextType;

  return (
    <div className={twMerge('text-white flex-center gap-3', isHidden && 'hidden md:flex lg:col-span-2 md:col-span-3')}>
      <Tooltip content={'Phát ngẫu nhiên'}>
        <button onClick={() => setIsRandom(!isRandom)}>
          <FaRandom
            size={20}
            className={twMerge(
              'hover:text-secondary',
              isRandom && 'text-secondary'
            )}
          />
        </button>
      </Tooltip>
      <Tooltip content={'Bài trước'}>
        <button onClick={() => handleChooseSong('PREVIOUS')}>
          <AiFillStepBackward size={28} className={'hover:text-secondary'} />
        </button>
      </Tooltip>
      <button onClick={handleTogglePlay}>
        {!isPlaying ? (
          <AiFillPlayCircle size={35} className={'hover:text-secondary'} />
        ) : (
          <AiFillPauseCircle size={35} className={'hover:text-secondary'} />
        )}
      </button>
      <Tooltip content={'Bài tiếp theo'}>
        <button onClick={() => handleChooseSong('NEXT')}>
          <AiFillStepForward size={28} className={'hover:text-secondary'} />
        </button>
      </Tooltip>
      <Tooltip content={'Lặp lại'}>
        <button onClick={() => setIsLoop(!isLoop)}>
          <ImLoop
            size={20}
            className={twMerge(
              'hover:text-secondary',
              isLoop && 'text-secondary'
            )}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default Control;
