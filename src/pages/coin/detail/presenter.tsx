import React from 'react';
import { useRecoilValue } from 'recoil';
import { currencyState } from '@stores/Currency';

function Presenter() {
  const currency = useRecoilValue(currencyState);

  return (
    <>
      <div>detail page - coin</div>
      <div>{currency}</div>
    </>
  );
}

export default Presenter;
