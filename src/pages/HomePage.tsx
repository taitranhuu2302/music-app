import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Song from '../components/Song';
import AppLayout from '../layouts/AppLayout';
import { useGetCharts, useSearch } from '../services';
import SongSkeleton from '../components/SongSkeleton';
import { AudioContext, AudioContextType } from '../contexts/AudioContext';
import { useAppSelector } from '../redux/hooks';
import SongSearch from '../components/SongSearch';
import Charts from '../components/Charts';
import { useSearchParams } from 'react-router-dom';
import Favorite from '../components/Favorite';

interface IProps {}

const HomePage: React.FC<IProps> = () => {
  const [searchParams] = useSearchParams();

  const renderTabs = useMemo(() => {
    const active = searchParams.get('active');
    if (active === 'favorite') {
      return <Favorite />;
    }
    return <Charts />;
  }, [searchParams]);

  return (
    <>
      <AppLayout>{renderTabs}</AppLayout>
    </>
  );
};

export default HomePage;
