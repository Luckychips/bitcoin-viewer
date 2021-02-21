import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { ChevronUp, ChevronDown } from '@emotion-icons/fa-solid';
import { CURRENCY_NAMES } from '@variables/constant';
import { currencyState, currencyStateFromLocalStorage } from '@stores/Currency';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Header = styled.div`
  display: inline-block;
  width: 60px;
  padding: 5px 10px;
  border: 1px solid #ddd;

  &:hover {
    cursor: pointer;
  }
`;

const HeaderText = styled.span`
  margin-right: 5px;
`;

const MenuItems = styled.div`
  position: absolute;
  background-color: white;
`;

const MenuItem = styled.div`
  width: 60px;
  padding: 5px 10px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  &:hover {
    cursor: pointer;
  }
`;

const DropDownMenu = () => {
  const [currency, setCurrency] = useRecoilState(currencyState);
  const [, setCurrencyFromLocalStorage] = useRecoilState(currencyStateFromLocalStorage);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  const changeCurrency = (value: string) => {
    setIsVisibleMenu(false);
    setCurrency(value);
    setCurrencyFromLocalStorage(value);
  };

  return (
    <Container>
      <Header onClick={() => setIsVisibleMenu(!isVisibleMenu)}>
        <HeaderText>{currency}</HeaderText>
        {isVisibleMenu ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </Header>
      {isVisibleMenu && (
        <MenuItems>
          <MenuItem onClick={() => changeCurrency(CURRENCY_NAMES.KRW)}>{CURRENCY_NAMES.KRW}</MenuItem>
          <MenuItem onClick={() => changeCurrency(CURRENCY_NAMES.USD)}>{CURRENCY_NAMES.USD}</MenuItem>
        </MenuItems>
      )}
    </Container>
  );
};

export default DropDownMenu;
