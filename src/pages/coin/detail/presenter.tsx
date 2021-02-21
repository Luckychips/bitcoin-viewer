import React from 'react';
import { useRecoilState } from 'recoil';
import { currencyState, currencyStateFromLocalStorage } from '@stores/Currency';

function Presenter() {
  const [currency] = useRecoilState(currencyState);

  return (
    <>
      <div>detail page - coin</div>
      <div>{currency}</div>
    </>
  );
}

export default Presenter;
