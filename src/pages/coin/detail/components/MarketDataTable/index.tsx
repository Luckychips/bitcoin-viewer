import React from 'react';
import styled from '@emotion/styled';
import { InlineFlexBox } from '@components/core';
import { prefixToValue } from '@libs/currency';
import { CURRENCY_NAMES } from '@variables/constant';
import { CoinDetailData } from '@models/coin';

type MarketDataTableProps = {
  item: CoinDetailData;
  currency: string;
};

const TableWrapper = styled.div`
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

const MarketDataTable = ({ item, currency }: MarketDataTableProps) => {
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

  return (
    <TableWrapper>
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
    </TableWrapper>
  );
};

export default MarketDataTable;
