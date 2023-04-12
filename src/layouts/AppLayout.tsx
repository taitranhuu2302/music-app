import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Control from '../components/Control';
import Index from '../components/Modal/AudioModal';

interface IProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <div className={'h-screen overflow-hidden bg-[#170F23] flex relative'}>
        {/*region Sidebar*/}
        <Sidebar />
        {/*endregion*/}
        <div className={'h-content w-full flex flex-col p-2 md:p-5 overflow-y-auto overflow-x-hidden'}>
          <Header />
          {children}
        </div>
        <Control />
      </div>
    </>
  );
};

export default AppLayout;
