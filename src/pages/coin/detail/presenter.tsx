import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/Currency';
import { MainWrapper, LoadingIndicator } from '@components/core';
import { CoinData } from '@models/coin';

type PresenterProps = {
  isLoading: boolean;
  item: CoinData | null;
};

const PageHeader = styled.div`
  display: flex;
  align-items: center; 
`;

const CoinThumbnail = styled.span`
  img {
    width: 50px;
  }
`;

const CoinInfo = styled.span`
  margin-left: 15px;
  font-size: 1.2rem;
  font-weight: bold;
`;

function Presenter({ isLoading, item }: PresenterProps) {
  const currency = useRecoilValue(currencyState);

  if (isLoading || !item) {
    return <LoadingIndicator />;
  }

  return (
    <MainWrapper>
      <PageHeader>
        <CoinThumbnail>
          {item.image && <img src={item.image} alt='thumbnail' />}
        </CoinThumbnail>
        <CoinInfo>{item.name} ({item.symbol.toUpperCase()})</CoinInfo>
      </PageHeader>
    </MainWrapper>
  );
}

export default Presenter;
