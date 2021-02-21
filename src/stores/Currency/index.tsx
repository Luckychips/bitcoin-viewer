import { atom, selector } from 'recoil';
import { CURRENCY_NAMES, STORAGE_KEY_NAMES } from '@variables/constant';

const retrieveFromLocalStorage = (initValue: string) => {
  const localSavedCurrency = localStorage.getItem(STORAGE_KEY_NAMES.CURRENCY);
  if (localSavedCurrency) {
    return localSavedCurrency;
  }

  return initValue;
};

export const currencyState = atom<string>({
  key: 'currencyState',
  default: selector<string>({
    key: 'currencyState/Default',
    get: () => retrieveFromLocalStorage(CURRENCY_NAMES.KRW),
  }),
});

export const currencyStateFromLocalStorage = selector<string>({
  key: 'currencyStateFromLocalStorage',
  get: ({ get }) => retrieveFromLocalStorage(get(currencyState)),
  set: ({ set }, newValue) => {
    set(currencyState, newValue);
    if (typeof newValue === 'string') {
      localStorage.setItem(STORAGE_KEY_NAMES.CURRENCY, newValue);
    }
  },
});
