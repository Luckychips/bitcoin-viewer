import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from './container';

function CoinDetail({ match }: RouteComponentProps<{ id: string }>) {
  return <Container id={match.params.id} />;
}

export default CoinDetail;
