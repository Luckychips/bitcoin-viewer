import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/recoil';
import { CoinData } from '@models/coin';
import { themeColor } from '@variables/env';
import { BookMarkButton } from '@components/core';
import { prefixToValue } from '@libs/currency';

type ListItemProps = {
  item: CoinData;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${themeColor};

  &:hover {
    background-color: ${themeColor};
  }
`;

const ThumbnailWrapper = styled.span`
  width: 5%;

  img {
    width: 25px;
  }
`;

const Symbol = styled.span`
  width: 10%;
`;

const MarketCapRank = styled.span`
  width: 10%;
`;

const Name = styled.span`
  width: 20%;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const PercentageChangesWithIn24Hours = styled.span`
  width: 8%;
  text-align: right;
  color: ${({ color }: StyleProps) => color};
`;

const CurrentPrice = styled.span`
  width: 20%;
  text-align: right;
`;

const getPercentageValue = (value: number | undefined) => {
  // 소수점 몇 자리 이하 퍼센티지 값은 0으로 강제 수렴
  const target = {
    percentageColor: 'black',
    percentageText: '-',
  };

  if (value) {
    if (value > 0) {
      target.percentageColor = '#e63959';
      target.percentageText = value.toFixed(1);
    } else if (value < 0) {
      target.percentageColor = themeColor;
      target.percentageText = value.toFixed(1);
    }

    if (Number(target.percentageText) === 0) {
      target.percentageColor = 'black';
      target.percentageText = '-';
    }
  }

  return target;
};

const ListItem = ({ item }: ListItemProps) => {
  const history = useHistory();
  const currency = useRecoilValue(currencyState);
  const { percentageColor, percentageText } = getPercentageValue(item.price_change_percentage_24h);

  const goToDetailPage = () => {
    history.push(`/coin/${item.id}`, {
      detailCoinItem: item,
    });
  };

  return (
    <Wrapper>
      <BookMarkButton item={item} />
      <ThumbnailWrapper>{item.image && <img src={item.image} alt="thumbnail" />}</ThumbnailWrapper>
      <Symbol>{item.symbol.toUpperCase()}</Symbol>
      <MarketCapRank>#{item.market_cap_rank}</MarketCapRank>
      <Name onClick={goToDetailPage}>{item.name}</Name>
      <PercentageChangesWithIn24Hours color={percentageColor}>{percentageText}%</PercentageChangesWithIn24Hours>
      <CurrentPrice>{prefixToValue(currency, item.current_price)}</CurrentPrice>
    </Wrapper>
  );
};

export default ListItem;
