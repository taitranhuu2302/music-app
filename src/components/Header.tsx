import React, { useCallback, useContext, useState, useTransition } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { handleSearch } from '../redux/features/SearchSlice';
import { Avatar, Button, Dropdown } from 'flowbite-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../configs/firebase';
import { EMAIL_KEY } from '../constants/Authentication';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { authCurrent } = useContext(AuthContext) as AuthContextType;
  const handleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      if (typeof data.user.email === 'string') {
        localStorage.setItem(EMAIL_KEY, data.user.email);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={'flex justify-between gap-2.5'}>
        <Input />
        {!authCurrent ? (
          <div
            className={
              'flex items-center gap-2.5 cursor-pointer hidden sm:flex'
            }
            onClick={handleLogin}
          >
            <Avatar rounded={true} />
          </div>
        ) : (
          <div
            className={
              'flex items-center gap-2.5 cursor-pointer hidden sm:flex'
            }
          >
            <p className={'text-white font-semibold'}>
              {authCurrent.displayName}
            </p>
            <Avatar img={authCurrent.photoURL ?? ''} rounded={true} />
          </div>
        )}
      </div>
    </>
  );
};

const Input = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    startTransition(() => {
      dispatch(handleSearch(newValue));
    });
  };

  return (
    <div
      className={
        'max-w-[700px] bg-[rgba(255,255,255,0.1)] w-full flex min-h-[48px] px-5 gap-2.5 rounded-[20px]'
      }
    >
      <button className={'text-input'}>
        <BsSearch />
      </button>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        className={
          'bg-transparent flex-grow outline-none text-input border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none'
        }
        placeholder={'Search, Songs, Genre, Album, Artists'}
      />
    </div>
  );
};

export default Header;
