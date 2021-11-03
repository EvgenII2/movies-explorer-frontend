import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <Header isAuthorized={false} />
                    <Main />
                    <Footer />
                </Route>
                <Route exact path="/movies">
                    <Header isAuthorized />
                    <Movies />
                    <Footer />
                </Route>
                <Route exact path="/saved-movies">
                    <Header isAuthorized />
                    <SavedMovies />
                    <Footer />
                </Route>
                <Route exact path="/profile">
                    <Header isAuthorized />
                    <Profile />
                </Route>
                <Route exact path="/sign-in">
                    <Login />
                </Route>
                <Route exact path="/sign-up">
                    <Register />
                </Route>
                <Route path="/*">
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
