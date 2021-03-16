import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CoinDetailData } from '@models/coin';
import { baseUrl } from '@variables/env';
import { currencyState } from '@stores/Currency';
import Presenter from './presenter';

type ContainerProps = { id: string };

function Container({ id }: ContainerProps) {
  const currency = useRecoilValue(currencyState);
  const [item, setItem] = useState<CoinDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const url = `${baseUrl}${`/coins/${id}?localization=true&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await response.json();
        setItem(json);
        setIsLoading(false);
      } catch (e) {
        console.log('데이터를 가져올 수 없습니다.');
        setIsLoading(false);
      }
    })();
  }, [id]);

  return <Presenter currency={currency} isLoading={isLoading} item={item} />;
}

export default Container;
