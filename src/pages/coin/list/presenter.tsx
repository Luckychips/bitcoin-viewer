import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/recoil';
import { DropDownMenu, ListItem, LoadingIndicator, LoadMoreButton } from '@components/core';
import { CoinData } from '@models/coin';

type PresenterProps = {
  isLoading: boolean;
  list: CoinData[];
  loadMoreItems: () => void;
};

const Container = styled.div`
  width: 800px;
  display: block;
  margin: 0 auto;
  padding: 25px 0;
`;

function Presenter({ isLoading, list, loadMoreItems }: PresenterProps) {
  const currency = useRecoilValue(currencyState);

  return (
    <Container>
      <DropDownMenu />
      {list.map((item, index) => (
        <ListItem key={`coin-item-${index}`} item={item} />
      ))}
      {isLoading ? <LoadingIndicator /> : <LoadMoreButton onClick={loadMoreItems} />}
    </Container>
  );
}

export default Presenter;
