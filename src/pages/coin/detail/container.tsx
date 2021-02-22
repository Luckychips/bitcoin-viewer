import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CoinData, LocationStateProps } from '@models/coin';
import Presenter from './presenter';

function Container() {
  const location = useLocation<LocationStateProps>();
  const [item, setItem] = useState<CoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location.state.hasOwnProperty('detailCoinItem')) {
      setTimeout(() => {
        setItem(location.state.detailCoinItem);
        setIsLoading(false);
      }, 1000);
    }
  }, [location]);

  return <Presenter isLoading={isLoading} item={item} />;
}

export default Container;
