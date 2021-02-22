import React from 'react';
import styled from '@emotion/styled';
import { Star } from '@emotion-icons/fa-solid';
import { CoinData } from '@models/coin';

type ListItemProps = {
  item: CoinData;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #376fe0;
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

const Name = styled.span``;

const ListItem = ({ item }: ListItemProps) => {
  console.log(item);
  return (
    <Wrapper>
      <BookMarkButton>
        <Star size={20} color={'pink'} />
      </BookMarkButton>
      <ThumbnailWrapper>{item.image && <img src={item.image} alt="thumbnail" />}</ThumbnailWrapper>
      <Symbol>{item.symbol.toUpperCase()}</Symbol>
      <Name>{item.name}</Name>
    </Wrapper>
  );
};

export default ListItem;
