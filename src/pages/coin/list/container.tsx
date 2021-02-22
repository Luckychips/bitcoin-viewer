import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currencyState } from '@stores/Currency';
import { CoinData } from '@models/coin';
import { baseUrl } from '@variables/env';
import Presenter from './presenter';

function Container() {
  const currency = useRecoilValue(currencyState);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<CoinData[]>([]);

  const getDataFromServer = async () => {
    const targetUrl = `${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}`;
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsed = await response.json();
    setList([...list, ...parsed]);
    setIsLoading(false);
  };

  const loadMoreItems = () => {
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    (async () => {
      await getDataFromServer();
    })();
  }, [currentPage]);

  return (
      <Presenter
          isLoading={isLoading}
          list={list}
          loadMoreItems={loadMoreItems}
      />
  );
}

export default Container;
