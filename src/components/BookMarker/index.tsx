import React from 'react';
import styled from '@emotion/styled';
import { ExclamationCircle } from '@emotion-icons/fa-solid';
import { bookMarksStateFromLocalStorage } from '@stores/BookMarks';
import { useRecoilValue } from 'recoil';

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 100;
  background-color: #376fe0;
  border-radius: 5px;
  padding: 10px 15px;
  width: 250px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
`;

const BookMarkItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

const BookMarkIcon = styled.span`
  img {
    width: 25px;
  }
`;

const BookMarkName = styled.span`
  margin-left: 20px;
`;

const BookMarkSymbol = styled.span`
  margin-left: 2.5px;
`;

const EmptyBookMark = styled.div`
  position: relative;
  text-align: center;

  svg {
    position: absolute;
    left: 0;
  }
`;

const EmptyBookMarkText = styled.span`
  margin-left: 5px;
`;

const BookMarker = () => {
  const savedBookMarks = useRecoilValue(bookMarksStateFromLocalStorage);

  const moveToDetailPage = (id: string) => {
    window.location.href = `/coin/${id}`;
  };

  return (
    <Wrapper>
      {savedBookMarks.length > 0 ? (
        savedBookMarks.map((bookMark, index) => (
          <BookMarkItem key={`saved-bookmark-${index}`} onClick={() => moveToDetailPage(bookMark.id)}>
            <BookMarkIcon>
              <img src={bookMark.image} alt="ico" />
            </BookMarkIcon>
            <BookMarkName>{bookMark.name}</BookMarkName>
            <BookMarkSymbol>({bookMark.symbol.toUpperCase()})</BookMarkSymbol>
          </BookMarkItem>
        ))
      ) : (
        <EmptyBookMark>
          <ExclamationCircle size={17} />
          <EmptyBookMarkText>저장된 북마크가 없습니다.</EmptyBookMarkText>
        </EmptyBookMark>
      )}
    </Wrapper>
  );
};

export default BookMarker;
