import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/Currency';
import { MainWrapper, InlineFlexBox, BookMarkButton, LoadingIndicator } from '@components/core';
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

const CoinName = styled.span`
  margin-left: 15px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const MarketDataTable = styled.div`
  display: inline-block;
  display: inline-block;
  margin-top: 30px;
  border: 1px solid #777;

  & > div:not(:first-child) {
    border-top: 1px solid #777;
  }
`;

const MarketDataTitle = styled.div`
  width: 120px;
  padding: 10px;
  font-weight: bold;
  background-color: #ddd;
`;

const MarketDataValue = styled.div`
  width: 150px;
  padding: 10px;
`;

function Presenter({ isLoading, item }: PresenterProps) {
  const currency = useRecoilValue(currencyState);

  if (isLoading || !item) {
    return <LoadingIndicator />;
  }

  return (
    <MainWrapper>
      <PageHeader>
        <BookMarkButton item={item} />
        <CoinThumbnail>{item.image && <img src={item.image} alt="thumbnail" />}</CoinThumbnail>
        <CoinName>
          {item.name} ({item.symbol.toUpperCase()})
        </CoinName>
      </PageHeader>
      <MarketDataTable>
        <InlineFlexBox>
          <MarketDataTitle>시가총액 Rank</MarketDataTitle>
          <MarketDataValue>#{item.market_cap_rank}</MarketDataValue>
        </InlineFlexBox>
        <InlineFlexBox>
          <MarketDataTitle>시가총액</MarketDataTitle>
          <MarketDataValue>{item.market_cap.toLocaleString()}</MarketDataValue>
        </InlineFlexBox>
        <InlineFlexBox>
          <MarketDataTitle>현재가격</MarketDataTitle>
          <MarketDataValue>{item.current_price.toLocaleString()}</MarketDataValue>
        </InlineFlexBox>
      </MarketDataTable>
    </MainWrapper>
  );
}

export default Presenter;
