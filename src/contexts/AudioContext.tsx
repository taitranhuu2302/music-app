import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useGetCharts, useGetData } from '../services';
import { useAudio } from '../hooks/useAudio';

export type ChooseSongType = 'NEXT' | 'PREVIOUS' | 'RANDOM';

export type AudioContextType = {
  audioCurrent: SongType | null;
  handleChooseAudio: (song: SongType) => void;
  sourceCurrent: SongDataType | undefined;
  handleChooseSong: (type: ChooseSongType) => void;
  isWaiting: boolean;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
  isLoop: boolean;
  setIsLoop: React.Dispatch<React.SetStateAction<boolean>>;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
};

export const AudioContext = createContext<AudioContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}

const AudioProvider = ({ children }: IProps) => {
  const [audioCurrent, setAudioCurrent] = useState<SongType | null>(null);
  const [sourceCurrent, setSourceCurrent] = useState<SongDataType | undefined>(
    undefined
  );
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoop, setIsLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const { data } = useGetCharts();

  useGetData(audioCurrent?.code, (song) => {
    setSourceCurrent(song);
  });

  const handleChooseAudio = useCallback((song: SongType) => {
    setAudioCurrent(song);
  }, []);

  useEffect(() => {
    setAudioCurrent(data?.data.song[2] ?? null);
  }, [data]);

  const handleChooseSong = useCallback(
    (type: ChooseSongType) => {
      if (!data || !audioCurrent) return;

      const {
        data: { song },
      } = data;

      const indexSongCurrent = song.findIndex((s) => s.id === audioCurrent.id);
      if (indexSongCurrent === -1) return;

      switch (type) {
        case 'RANDOM':
          const indexRandom = Math.floor(Math.random() * song.length);
          setAudioCurrent(song[indexRandom]);
          return;
        case 'NEXT':
          if (indexSongCurrent === song.length - 1) return;
          setAudioCurrent(song[indexSongCurrent + 1]);
          return;
        case 'PREVIOUS':
          if (indexSongCurrent === 0) return;
          setAudioCurrent(song[indexSongCurrent - 1]);
          return;
      }
    },
    [data, audioCurrent]
  );
  return (
    <AudioContext.Provider
      value={{
        audioCurrent,
        handleChooseAudio,
        sourceCurrent,
        handleChooseSong,
        isWaiting,
        isRandom,
        isLoop,
        setIsLoop,
        setVolume,
        setIsRandom,
        setIsWaiting,
        volume,
        isPlaying,
        setIsPlaying,
        duration,
        setDuration,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
export default AudioProvider;
