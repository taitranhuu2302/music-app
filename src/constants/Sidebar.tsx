import { v4 as uuid } from 'uuid';
import { HiHome } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';

export const SIDEBAR_NAV = [
  {
    id: uuid(),
    name: 'Trang chủ',
    icon: <HiHome size={20} />,
    active: '',
  },
  {
    id: uuid(),
    name: 'Yêu thích',
    icon: <MdFavorite size={20} />,
    active: 'favorite',
  },
];
