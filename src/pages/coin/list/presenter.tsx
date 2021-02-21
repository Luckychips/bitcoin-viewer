import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { currencyState } from '@stores/recoil';
import { DropDownMenu } from '@components/core';

const Container = styled.div`
  width: 800px;
  display: block;
  margin: 0 auto;
  padding: 25px 0;
`;

function Presenter() {
  const currency = useRecoilValue(currencyState);

  return (
    <Container>
      <DropDownMenu />
      <div>hello coins</div>
      <div>{currency}</div>
    </Container>
  );
}

export default Presenter;
