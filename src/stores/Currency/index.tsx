import { atom, selector } from 'recoil';
import { CURRENCY_NAMES, STORAGE_KEY_NAMES } from '@variables/constant';

export const currencyState = atom<string>({
  key: 'currencyState',
  default: CURRENCY_NAMES.KRW,
});

export const currencyStateFromLocalStorage = selector<string>({
  key: 'currencyFromLocalStorage',
  get: ({ get }) => {
    const localSavedCurrency = localStorage.getItem(STORAGE_KEY_NAMES.CURRENCY);
    if (localSavedCurrency) {
      return localSavedCurrency;
    }

    return get(currencyState);
  },
  set: ({ set }, newValue) => {
    set(currencyState, newValue);
    if (typeof newValue === 'string') {
      localStorage.setItem(STORAGE_KEY_NAMES.CURRENCY, newValue);
    }
  },
});
