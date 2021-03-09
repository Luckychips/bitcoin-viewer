import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Star } from '@emotion-icons/fa-solid';
import { bookMarksStateFromLocalStorage } from '@stores/BookMarks';
import {CoinData, CoinDetailData} from '@models/coin';

type BookMarkProps = {
  item: CoinData | CoinDetailData;
};

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

const BookMark = ({ item }: BookMarkProps) => {
  const [bookMarks, setBookMarks] = useRecoilState(bookMarksStateFromLocalStorage);
  const [isBookMarked, setIsBookMarked] = useState(false);

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
      const newBookMark: CoinData = {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        current_price: 0,
        market_cap: 0,
      };

      setBookMarks([...bookMarks, newBookMark]);
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
    <BookMarkButton onClick={() => toggleBookMark()}>
      <Star size={20} color={isBookMarked ? 'pink' : '#ddd'} />
    </BookMarkButton>
  );
};

export default BookMark;
