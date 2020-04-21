import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Pages
import index from './pages/Index';

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={index} />
      </Switch>
    </BrowserRouter>
  )
}