import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/movies">
          <Header isAuthorized />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isAuthorized />
          saved-movies
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isAuthorized />
          profile
        </Route>
        <Route path="/sign-in">
          sign-in
        </Route>
        <Route path="/sign-up">
          sign-up
        </Route>
        <Route path="/">
          <Header isAuthorized={false} />
          <Main />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
