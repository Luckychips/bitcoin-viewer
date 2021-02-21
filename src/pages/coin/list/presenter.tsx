import React from 'react';
import { useRecoilState } from 'recoil';
import { currencyState, currencyStateFromLocalStorage } from '@stores/recoil';
import { CURRENCY_NAMES } from '@variables/constant';

function Presenter() {
  const [currency, setCurrency] = useRecoilState(currencyState);
  const [, setCurrencyFromLocalStorage] = useRecoilState(currencyStateFromLocalStorage);

  const updateCurrency = (value: string) => {
    setCurrency(value);
    setCurrencyFromLocalStorage(value);
  };

  return (
    <div>
      <button onClick={() => updateCurrency(CURRENCY_NAMES.KRW)}>krw</button>
      <button onClick={() => updateCurrency(CURRENCY_NAMES.USD)}>usd</button>
      <div>hello coins</div>
      <div>{currency}</div>
    </div>
  );
}

export default Presenter;
