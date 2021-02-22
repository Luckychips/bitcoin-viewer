import React from 'react';
import { DropDownMenu, ListItem, LoadingIndicator, LoadMoreButton, MainWrapper } from '@components/core';
import { CoinData } from '@models/coin';

type PresenterProps = {
  isLoading: boolean;
  list: CoinData[];
  loadMoreItems: () => void;
};

function Presenter({ isLoading, list, loadMoreItems }: PresenterProps) {
  return (
    <MainWrapper>
      <DropDownMenu />
      {list.map((item, index) => (
        <ListItem key={`coin-item-${index}`} item={item} />
      ))}
      {isLoading ? <LoadingIndicator /> : <LoadMoreButton onClick={loadMoreItems} />}
    </MainWrapper>
  );
}

export default Presenter;
