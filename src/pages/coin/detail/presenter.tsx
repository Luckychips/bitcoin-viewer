import React from 'react';
import styled from '@emotion/styled';
import {
  MainWrapper,
  InlineFlexBox,
  BookMarkButton,
  LoadingIndicator,
  DropDownMenu,
  BookMarker,
} from '@components/core';
import { CoinDetailData } from '@models/coin';
import { prefixToValue } from '@libs/currency';
import { CURRENCY_NAMES } from '@variables/constant';

type PresenterProps = {
  isLoading: boolean;
  item: CoinDetailData | null;
  currency: string;
};

const PageHeader = styled.div`
  position: relative;
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

const CurrencyMenuWrapper = styled.div`
  position: absolute;
  top: 12.5px;
  right: 0;
`;

const MarketDataTable = styled.div`
  display: inline-block;
  display: inline-block;
  margin-top: 30px;
  border: 1px solid #777;

  & > div:not(:first-of-type) {
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
  width: 250px;
  padding: 10px;
`;

const HomePageLink = styled.a`
  text-decoration: none;
  color: darkgray;

  &:visited {
    color: darkgray;
  }
`;

const Description = styled.div`
  padding-top: 25px;
  margin-top: 30px;
  margin-bottom: 100px;
  font-weight: 500;
  color: #555;
  white-space: pre-line;
  border-top: 1px solid #ddd;
`;

function Presenter({ currency, isLoading, item }: PresenterProps) {
  const getHomePage = () => {
    let value = '-';
    if (item) {
      if (item.links.homepage.length > 0) {
        value = item.links.homepage[0];
      }
    }

    return value;
  };

  const getMarketCap = () => {
    let value: number | string = 0;
    if (item) {
      switch (currency) {
        case CURRENCY_NAMES.KRW:
          value = item.market_data.market_cap.krw;
          break;
        case CURRENCY_NAMES.USD:
          value = item.market_data.market_cap.usd;
          break;
        case CURRENCY_NAMES.JPY:
          value = item.market_data.market_cap.jpy;
          break;
      }
    }

    return value;
  };

  const getCurrentPriceFromMarket = () => {
    let value: number | string = 0;
    if (item) {
      switch (currency) {
        case CURRENCY_NAMES.KRW:
          value = item.market_data.current_price.krw;
          break;
        case CURRENCY_NAMES.USD:
          value = item.market_data.current_price.usd;
          break;
        case CURRENCY_NAMES.JPY:
          value = item.market_data.current_price.jpy;
          break;
      }
    }

    return value;
  };

  const getDescriptionText = () => {
    let text = '';
    if (item) {
      switch (currency) {
        case CURRENCY_NAMES.KRW:
          text = item.description.ko as string;
          break;
        case CURRENCY_NAMES.USD:
          text = item.description.en as string;
          break;
        case CURRENCY_NAMES.JPY:
          text = item.description.ja as string;
          break;
      }
    }

    return text;
  };

  if (isLoading || !item) {
    return <LoadingIndicator />;
  }

  return (
    <MainWrapper>
      <BookMarker />
      <PageHeader>
        <BookMarkButton item={item} />
        <CoinThumbnail>{item.image.small && <img src={item.image.small} alt="thumbnail" />}</CoinThumbnail>
        <CoinName>
          {item.name} ({item.symbol.toUpperCase()})
        </CoinName>
        <CurrencyMenuWrapper>
          <DropDownMenu />
        </CurrencyMenuWrapper>
      </PageHeader>
      <MarketDataTable>
        <InlineFlexBox>
          <MarketDataTitle>웹사이트</MarketDataTitle>
          <MarketDataValue>
            <HomePageLink href={getHomePage()} target="_blank">
              {getHomePage()}
            </HomePageLink>
          </MarketDataValue>
        </InlineFlexBox>
        <InlineFlexBox>
          <MarketDataTitle>시가총액 Rank</MarketDataTitle>
          <MarketDataValue>#{item?.market_data.market_cap_rank}</MarketDataValue>
        </InlineFlexBox>
        <InlineFlexBox>
          <MarketDataTitle>시가총액</MarketDataTitle>
          <MarketDataValue>{prefixToValue(currency, getMarketCap())}</MarketDataValue>
        </InlineFlexBox>
        <InlineFlexBox>
          <MarketDataTitle>현재가격</MarketDataTitle>
          <MarketDataValue>{prefixToValue(currency, getCurrentPriceFromMarket())}</MarketDataValue>
        </InlineFlexBox>
      </MarketDataTable>
      <Description dangerouslySetInnerHTML={{ __html: getDescriptionText() }} />
    </MainWrapper>
  );
}

export default Presenter;
