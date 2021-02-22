import { atom, selector } from 'recoil';
import { DefaultValue } from 'recoil';
import { STORAGE_KEY_NAMES } from '@variables/constant';
import { CoinData } from '@models/coin';

const retrieveFromLocalStorage = (list: CoinData[]) => {
  const localSavedCurrency = localStorage.getItem(STORAGE_KEY_NAMES.BOOKMARKS);
  if (localSavedCurrency) {
    return JSON.parse(localSavedCurrency);
  }

  return list;
};

export const bookMarksState = atom<CoinData[]>({
  key: 'bookMarksState',
  default: selector<CoinData[]>({
    key: 'bookMarksState/Default',
    get: () => retrieveFromLocalStorage([]),
  }),
});

export const bookMarksStateFromLocalStorage = selector<CoinData[]>({
  key: 'bookMarksStateFromLocalStorage',
  get: ({ get }) => retrieveFromLocalStorage(get(bookMarksState)),
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(bookMarksState, newValue);
      localStorage.setItem(STORAGE_KEY_NAMES.BOOKMARKS, JSON.stringify(newValue));
    }
  },
});
