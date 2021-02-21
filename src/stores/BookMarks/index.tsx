import { atom } from 'recoil';
import { CoinData } from '@models/coin';

export const bookMarkState = atom({
  key: 'bookMarkState',
  default: [],
});
