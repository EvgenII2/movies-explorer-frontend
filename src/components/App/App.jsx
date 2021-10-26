import React from 'react';
import { Route, Switch } from "react-router-dom";
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/movies">
          <Header isAuthorized />
          movies
        </Route>
        <Route path="/saved-movies">
          <Header isAuthorized />
          saved-movies
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
          <Promo />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
