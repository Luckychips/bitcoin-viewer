import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Star } from '@emotion-icons/fa-solid';
import { bookMarksStateFromLocalStorage } from '@stores/BookMarks';
import { CoinData, CoinDetailData } from '@models/coin';

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

const ToastMessage = styled.div`
  z-index: 5;
  position: absolute;
  top: 40px;
  background-color: #360bf0;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const BookMark = ({ item }: BookMarkProps) => {
  const [bookMarks, setBookMarks] = useRecoilState(bookMarksStateFromLocalStorage);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isHideToastText, setIsHideToastText] = useState(true);
  const [toastText, setToastText] = useState('');

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
      setToastText('삭제');
      setIsHideToastText(false);
      setIsBookMarked(false);
      setBookMarks(deepCopied);
    } else {
      setIsBookMarked(true);
      let image = 'https://via.placeholder.com/20x20';
      if (typeof item.image === 'string') {
        image = item.image;
      }

      if (item.image && item.image.hasOwnProperty('small')) {
        image = item.image.small as string;
      }

      const newBookMark: CoinData = {
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        current_price: 0,
        market_cap: 0,
        image: image,
      };

      setToastText('추가');
      setIsHideToastText(false);
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

  useEffect(() => {
    if (!isHideToastText) {
      setTimeout(() => {
        setIsHideToastText(true);
      }, 1000);
    }
  }, [isHideToastText]);

  return (
    <>
      <BookMarkButton onClick={() => toggleBookMark()}>
        <Star size={20} color={isBookMarked ? 'pink' : '#ddd'} />
      </BookMarkButton>
      {!isHideToastText && <ToastMessage>북마크 {toastText}되었습니다.</ToastMessage>}
    </>
  );
};

export default BookMark;
