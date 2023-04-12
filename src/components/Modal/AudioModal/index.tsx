import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { AudioContext, AudioContextType } from '../../../contexts/AudioContext';
import { FiChevronDown } from 'react-icons/all';
import { ControlActions } from '../../Control';
import { convertSecondToMinute } from '../../../utils';
import Slider from '../../Slider/Slider';
import { updateCurrentTime } from '../../../redux/features/AudioSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import toast from 'react-hot-toast';
import ListMusic from './ListMusic';
import { TAB_AUDIO_MODAL, TabAudioActiveType } from '../../../constants';
import { twMerge } from 'tailwind-merge';
import Lyric from './Lyric';

interface IProps {
  open: boolean;
  onClose: () => void;
  handleChangeTime: (n: number) => void;
  handleTogglePlay: () => void;
}

const AudioModal: React.FC<IProps> = ({
  open,
  onClose,
  handleChangeTime,
  handleTogglePlay,
}) => {
  const { duration } = useContext(AudioContext) as AudioContextType;
  const { currentTime } = useAppSelector((state) => state.audio);
  const dispatch = useAppDispatch();
  const [tabActive, setTabActive] = useState<TabAudioActiveType>('Lyric');

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.3 }}
            className={'fixed top-0 left-0 w-full h-full'}
          >
            <AudioModalBG />
            <div className={'relative z-10 h-full flex flex-col'}>
              <div className={'flex p-5 flex-wrap'}>
                <div className={'flex-grow'}>
                  <img
                    src="https://zjs.zmdcdn.me/zmp3-desktop/dev/119956/static/media/icon_zing_mp3_60.f6b51045.svg"
                    alt=""
                    className={'w-[45px] h-[45px]'}
                  />
                </div>
                <div className={'flex-grow flex-center'}>
                  <ul
                    className={
                      'rounded-full w-fit flex gap-2 bg-opacity-ct p-1'
                    }
                  >
                    {TAB_AUDIO_MODAL.map((item) => (
                      <li
                        key={item.id}
                        className={twMerge(
                          'color-opacity-ct cursor-pointer py-[3px] px-[10px] md:px-[50px] w-fit rounded-full font-bold',
                          tabActive === item.type && 'bg-opacity-ct--active'
                        )}
                        onClick={() => setTabActive(item.type)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={'flex-grow flex items-center justify-end'}>
                  <button
                    className={
                      'bg-opacity-ct rounded-full pt-[2px] w-[45px] h-[45px] flex-center hover:opacity-80'
                    }
                    onClick={onClose}
                  >
                    <FiChevronDown size={30} color={'white'} />
                  </button>
                </div>
              </div>
              <div className={'flex-grow'}>
                {tabActive === 'List' && <ListMusic />}
                {tabActive === 'Lyric' && <Lyric />}
              </div>
              <div className={'py-5 px-2.5 flex-center flex-col'}>
                {/*<div className={'mb-2 flex-center gap-2.5'}>*/}
                {/*  <p className={'text-center text-lg font-semibold text-white'}>*/}
                {/*    {sourceCurrent?.name}*/}
                {/*  </p>*/}
                {/*  <div*/}
                {/*    className={'w-[5px] h-[5px] rounded-full bg-[#CACECC]'}*/}
                {/*  ></div>*/}
                {/*  <p className={'font-semibold text-[#AFB6B2]'}>*/}
                {/*    {sourceCurrent?.artistsNames}*/}
                {/*  </p>*/}
                {/*</div>*/}
                <div
                  className={
                    'flex items-center gap-5 max-w-[500px] w-full mb-2'
                  }
                >
                  <p className={'text-sm text-white'}>
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
                  <p className={'text-sm text-white'}>
                    {convertSecondToMinute(duration)}
                  </p>
                </div>
                <ControlActions handleTogglePlay={handleTogglePlay} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AudioModalBG = () => {
  const { sourceCurrent } = useContext(AudioContext) as AudioContextType;

  return (
    <div className={'absolute top-0 left-0 w-full h-full'}>
      <div
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(41,21,71,0.8)',
          position: 'absolute',
          backdropFilter: 'blur(20px)',
          zIndex: 2,
        }}
      ></div>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${sourceCurrent?.album.thumbnailMedium})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1,
        }}
      ></div>
    </div>
  );
};

export default AudioModal;
