import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/recoil';
import { ListItem } from '@components/core';
import { DropDownMenu } from '@components/core';
import { CoinData } from '@models/coin';

type PresenterProps = {
  list: CoinData[];
};

const Container = styled.div`
  width: 800px;
  display: block;
  margin: 0 auto;
  padding: 25px 0;
`;

function Presenter({ list }: PresenterProps) {
  const currency = useRecoilValue(currencyState);

  return (
    <Container>
      <DropDownMenu />
      {list.map((item, index) => (
        <ListItem key={`coin-item-${index}`} item={item} />
      ))}
    </Container>
  );
}

export default Presenter;
