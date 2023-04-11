import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SongItem from './Modal/AudioModal/SongItem';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';
import { Lrc, LrcLine, useRecoverAutoScrollImmediately } from 'react-lrc';
import { twMerge } from 'tailwind-merge';
import { useGetLyric } from '../services';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateCurrentTime, updateCurrentTimeTemp } from '../redux/features/AudioSlice';

interface IProps {}

const Lyric: React.FC<IProps> = () => {
  const { sourceCurrent } = useContext(AudioContext) as AudioContextType;
  const [lyrics, setLyrics] = useState<string>('');
  const { currentTime } = useAppSelector((state) => state.audio);
  const lineRefs = useRef<HTMLParagraphElement[]>([]);
  const dispatch = useAppDispatch();

  useGetLyric(sourceCurrent?.lyric, (data) => {
    setLyrics(data);
  });

  const lineRenderer = useCallback(
    ({
      active,
      line,
      index,
    }: {
      active: boolean;
      line: LrcLine;
      index: number;
    }) => {
      return (
        <p
          ref={(c) => {
            if (c) {
              lineRefs.current[index] = c;
            }
          }}
          onClick={() => {
            dispatch(updateCurrentTimeTemp(line.startMillisecond / 1000));
          }}
          className={twMerge('lyric-item cursor-pointer', active && 'is-active')}
        >
          {line.content}
        </p>
      );
    },
    []
  );

  useEffect(() => {
    if (lineRefs.current.length > 0) {
      const currentLineIndex = lineRefs.current.findIndex((ref) => {
        if (!ref.classList.contains('is-active')) return false;
        return ref;
      });
      if (currentLineIndex !== -1) {
        lineRefs.current[currentLineIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentTime]);

  return (
    <div className={'grid grid-cols-12 h-full items-center px-5 gap-5'}>
      <div className={'col-span-5'}>
        <SongItem song={sourceCurrent} />
      </div>
      <div className={'scroll-lyric flex-grow col-span-7'}>
        {sourceCurrent?.lyric ? (
          <Lrc
            verticalSpace={true}
            lrc={lyrics}
            lineRenderer={lineRenderer}
            currentMillisecond={currentTime * 1000}
            recoverAutoScrollInterval={5000}
          />
        ) : (
          <p className={'lyric-item'}>Bài này chưa có lyric</p>
        )}
        {/*<p className={'lyric-item is-over'}>Xin chao</p>*/}
        {/*<p className={'lyric-item is-over'}>Xin chao</p>*/}
        {/*<p className={'lyric-item is-over'}>Xin chao</p>*/}
        {/*<p className={'lyric-item is-active'}>Xin chao</p>*/}
        {/*<p className={'lyric-item'}>Xin chao</p>*/}
        {/*<p className={'lyric-item'}>Xin chao</p>*/}
      </div>
    </div>
  );
};

export default Lyric;
