import React from 'react';
import { BsSearch } from 'react-icons/bs';

interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <>
      <div className={'flex justify-between'}>
        <Input />
        <div className={'flex items-center gap-2.5 pointer-events-none'}>
          <p className={'text-white text-xl font-semibold'}>Tran Huu Tai</p>
          <img
            src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.18169-9/18556006_104946380091976_9183765241575257849_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ot3bmnI-w54AX-Af3i_&_nc_ht=scontent.fdad3-1.fna&oh=00_AfDusXtfn-Dmnv8mVH8OdBHx7xQjLfB9D6_OxGL7uV4s7A&oe=6451A287"
            alt=""
            className={'rounded-full w-[45px] h-[45px]'}
          />
        </div>
      </div>
    </>
  );
};

const Input = () => {
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
        type="text"
        className={'bg-transparent flex-grow outline-none text-input border-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none'}
        placeholder={'Search, Songs, Genre, Album, Artists'}
      />
    </div>
  );
};

export default Header;
