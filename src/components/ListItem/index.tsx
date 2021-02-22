import React, {useEffect, useState} from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Star } from '@emotion-icons/fa-solid';
import { currencyState, bookMarksStateFromLocalStorage } from '@stores/recoil';
import { CoinData } from '@models/coin';
import { themeColor } from '@variables/env';
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

const BookMarkButton = styled.span`
  position: relative;
  width: 4%;

  svg {
    position: absolute;
    top: -11.5px;
  }

  &:hover {
    cursor: pointer;
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
  const currency = useRecoilValue(currencyState);
  const [bookMarks, setBookMarks] = useRecoilState(bookMarksStateFromLocalStorage);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const { percentageColor, percentageText } = getPercentageValue(item.price_change_percentage_24h);

  const toggleBookMark = () => {
    if (isBookMarked) {
      const deepCopied = bookMarks.slice();
      let targetIndex = 0;
      for (let i = 0; i < deepCopied.length; i++) {
        if (item.id === deepCopied[i].id) {
          targetIndex = i;
          break;
        }
      }

      deepCopied.splice(targetIndex, 1);
      setIsBookMarked(false);
      setBookMarks(deepCopied);
    } else {
      setIsBookMarked(true);
      setBookMarks([...bookMarks, item]);
    }
  };

  useEffect(() => {
    for (let i = 0; i < bookMarks.length; i++) {
      if (item.id === bookMarks[i].id) {
        setIsBookMarked(true);
        break;
      }
    }
  }, []);

  return (
    <Wrapper>
      <BookMarkButton onClick={() => toggleBookMark()}>
        <Star size={20} color={isBookMarked ? 'pink' : '#ddd'} />
      </BookMarkButton>
      <ThumbnailWrapper>{item.image && <img src={item.image} alt="thumbnail" />}</ThumbnailWrapper>
      <Symbol>{item.symbol.toUpperCase()}</Symbol>
      <MarketCapRank>#{item.market_cap_rank}</MarketCapRank>
      <Name>{item.name}</Name>
      <PercentageChangesWithIn24Hours color={percentageColor}>{percentageText}</PercentageChangesWithIn24Hours>
      <CurrentPrice>{prefixToValue(currency, item.current_price)}</CurrentPrice>
    </Wrapper>
  );
};

export default ListItem;
