import React, { useMemo } from 'react';
import { SIDEBAR_NAV } from '../constants';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

interface IProps {}

const Sidebar: React.FC<IProps> = () => {
  const renderListSidebar = useMemo(() => {
    return (
      <ul className={'mt-5 flex flex-col gap-2'}>
        {SIDEBAR_NAV.map((item, index) => {
          return (
            <li
              key={item.id}
              className={twMerge(
                'text-white flex items-center gap-2.5 p-2 hover:bg-primary rounded transition-all duration-200 cursor-pointer',
                index === 0 && 'bg-primary'
              )}
              onClick={() =>
                index !== 0 && toast.error('Tính năng đang phát triển')
              }
            >
              {item.icon}
              <span className={'text-lg font-semibold'}>{item.name}</span>
            </li>
          );
        })}
      </ul>
    );
  }, []);

  return (
    <div className={'w-[300px] h-content bg-[#231B2E] p-5'}>
      <img src="/logo.png" alt="" className={'cursor-pointer'} />
      {renderListSidebar}
    </div>
  );
};

export default Sidebar;
