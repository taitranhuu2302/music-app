import { useCallback, useEffect, useState } from 'react';

export const useAudio = (audioSrc?: string) => {
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    if (!audioSrc) return;
    const newAudio = new Audio();
    newAudio.src = audioSrc;
    setAudio(newAudio);
  }, [audioSrc]);

  const setVolume = (volume: number) => {
    audio.volume = volume;
  };

  useEffect(() => {
    audio.volume = 0.2;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const handlePlayAudio = useCallback(() => {
    audio.currentTime = 0;
    audio.autoplay = true;
    audio.play().then();
  }, [audio]);

  return {
    audio,
    setVolume,
    handlePlayAudio,
  };
};
