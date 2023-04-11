import React, { useContext } from 'react';
import SongItem from './SongItem';
import { AudioContext, AudioContextType } from '../../../contexts/AudioContext';

interface IProps {}

const ListMusic: React.FC<IProps> = () => {
  const { sourceCurrent } = useContext(AudioContext) as AudioContextType;

  return (
    <>
      <div className={'h-full flex-center'}>
        <SongItem song={sourceCurrent} />
      </div>
    </>
  );
};

export default ListMusic;
