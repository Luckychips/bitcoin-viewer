import React from 'react';
import styled from '@emotion/styled';

type LoadMoreButtonProps = {
  onClick: () => void;
};

const Wrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  div {
    display: inline-block;
    padding: 10px 20px;
    background-color: #376fe0;
    color: white;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <Wrapper onClick={onClick}>
      <div>더보기</div>
    </Wrapper>
  );
};

export default LoadMoreButton;
