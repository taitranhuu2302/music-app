import { v4 as uuid } from 'uuid';
import { HiHome, HiOutlineChartSquareBar } from 'react-icons/hi';

export const SIDEBAR_NAV = [
  {
    id: uuid(),
    name: 'Trang chủ',
    icon: <HiHome size={20} />,
  },
  {
    id: uuid(),
    name: 'Yêu thích',
    icon: <HiOutlineChartSquareBar size={20} />,
  },
];
