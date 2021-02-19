import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PATH_NAMES } from '@variables/constant';
import { CoinList, CoinDetail } from '@pages/path';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={PATH_NAMES.COINS} />
        </Route>
        <Route path={PATH_NAMES.COINS} component={CoinList} />
        <Route path="/coin/:id" component={CoinDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
