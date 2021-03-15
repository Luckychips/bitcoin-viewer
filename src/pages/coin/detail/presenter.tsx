import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MainWrapper, BookMarkButton, LoadingIndicator, DropDownMenu, BookMarker } from '@components/core';
import { CoinDetailData } from '@models/coin';
import { CURRENCY_NAMES } from '@variables/constant';
import { MarketDataTable, CandleStickChart, LineChart } from './components';

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
  top: 110px;
  right: 0;
`;

const Tabs = styled.div`
  position: relative;
`;

const TabHeader = styled.div`
  width: 100%;
  margin: 25px 0;
`;

const TabItem = styled.div`
  width: calc(50% - 1px);
  display: inline-block;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #376fe0;
  padding: 15px 0;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }

  &.active {
    border: 0.5px solid #000;
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
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
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
      </PageHeader>
      <Tabs>
        <TabHeader>
          <TabItem className={currentTabIndex === 0 ? 'active' : ''} onClick={() => setCurrentTabIndex(0)}>
            데이터
          </TabItem>
          <TabItem className={currentTabIndex !== 0 ? 'active' : ''} onClick={() => setCurrentTabIndex(1)}>
            차트
          </TabItem>
        </TabHeader>
        {currentTabIndex === 0 ? (
          <>
            <MarketDataTable item={item} currency={currency} />
            <CurrencyMenuWrapper>
              <DropDownMenu />
            </CurrencyMenuWrapper>
          </>
        ) : (
          <LineChart item={item} currency={currency} />
        )}
      </Tabs>
      {currentTabIndex === 0 && <Description dangerouslySetInnerHTML={{ __html: getDescriptionText() }} />}
    </MainWrapper>
  );
}

export default Presenter;
