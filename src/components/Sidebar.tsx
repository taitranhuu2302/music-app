import React, { useContext, useMemo } from 'react';
import { SIDEBAR_NAV } from '../constants';
import { twMerge } from 'tailwind-merge';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { auth } from '../configs/firebase';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

interface IProps {}

const Sidebar: React.FC<IProps> = () => {
  const { authCurrent, clearAuth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        clearAuth();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderListSidebar = useMemo(() => {
    return (
      <ul className={'mt-5 flex flex-col gap-2'}>
        {SIDEBAR_NAV.map((item) => {
          return (
            <li
              key={item.id}
              className={twMerge(
                'text-white flex justify-center items-center gap-2.5 p-2 hover:bg-primary rounded transition-all duration-200 cursor-pointer',
                searchParams.get('active') === item.active && 'bg-primary'
              )}
              onClick={() => {
                searchParams.set('active', item.active);
                setSearchParams(searchParams);
              }}
            >
              {item.icon}
              <span className={'text-lg font-semibold hidden lg:block'}>
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, [searchParams]);

  return (
    <div
      className={
        'w-[100px] lg:w-[300px] h-content bg-[#231B2E] p-5 flex justify-between gap-2.5 flex-col'
      }
    >
      <div>
        <img src="/logo.png" alt="" className={'cursor-pointer'} />
        {renderListSidebar}
      </div>
      {authCurrent && (
        <button
          className={twMerge(
            'text-white flex justify-center items-center gap-2.5 p-2 bg-primary hover:opacity-80 rounded transition-all duration-200 cursor-pointer'
          )}
          onClick={handleLogout}
        >
          <FiLogOut />
          <span className={'text-lg font-semibold hidden lg:block'}>
            Logout
          </span>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
