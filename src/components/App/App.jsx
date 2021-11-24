import React from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import auth from '../../utils/auth';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";
import moviesApi from '../../utils/MoviesApi';
import history from '../../utils/history';

function App() {
    const hist = useHistory();

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");
    const [isUpdateCurrentUser, setIsUpdateCurrentUser] = React.useState(false);

    const [allLikedMovies, setAllLikedMovies] = React.useState([]);
    const [isUpdateLikedMovies, setIsUpdateLikedMovies] = React.useState(true);
    const [allMovies, setAllMovies] = React.useState([]);
    const [allFilteredMovies, setAllFilteredMovies] = React.useState([]);
    const [isUpdateMovies, setIsUpdateMovies] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const [word, setWord] = React.useState(null);

    React.useEffect(() => {
        if (isUpdateCurrentUser) {
            api
                .getUser()
                .then((res) => {
                    setCurrentUser({
                        email: res.email,
                        name: res.name,
                        id: res._id
                    });
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }, [isUpdateCurrentUser, loggedIn]);

    React.useEffect(() => {
        api
            .getMovies()
            .then((res) => {
                setAllLikedMovies(res.filter(movie => { return movie.owner === currentUser.id }));
                setIsUpdateLikedMovies(false);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }, [currentUser, isUpdateLikedMovies, loggedIn]);

    React.useEffect(() => {
        if (isUpdateMovies) {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((res) => {
                    setAllMovies(res);
                    setError("");
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    setIsLoading(false);
                    setError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                });
        }
    }, [isUpdateMovies]);

    React.useEffect(() => {
        setAllFilteredMovies(allMovies.filter((movie) => {
            return movie.nameRU.toUpperCase().includes(word?.toUpperCase());
        }))
    }, [allMovies, word]);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            auth
                .tokenCheck(token)
                .then((resp) => {
                    setLoggedIn(true);
                    setIsUpdateLikedMovies(true);
                    setCurrentUser({
                        email: resp.email,
                        name: resp.name,
                        id: resp._id
                    });
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    localStorage.removeItem("token");
                });
        }
        const path = history.location.pathname;
        if (path !== '/sign-in' && path !== '/sign-up')
            hist.push(history.location.pathname);
    }, [hist]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Switch>
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        allMovies={allMovies}
                        allLikedMovies={allLikedMovies}
                        setIsUpdateMovies={setIsUpdateMovies}
                        setIsUpdateLikedMovies={setIsUpdateLikedMovies}
                        setWord={setWord}
                        word={word}
                        allFilteredMovies={allFilteredMovies}
                        error={error}
                        isLoading={isLoading}
                        path="/movies"
                        component={Movies}
                    />
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        allLikedMovies={allLikedMovies}
                        setIsUpdateLikedMovies={setIsUpdateLikedMovies}
                        path="/saved-movies"
                        component={SavedMovies}
                    />
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        onLogin={setLoggedIn}
                        setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                        component={Profile}
                        setAllFilteredMovies={setAllFilteredMovies}
                        setWord={setWord}
                    />
                    <Route path="/sign-in">
                        {loggedIn ? <Redirect to="/" /> :
                            <Login
                                onLogin={setLoggedIn}
                                setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                            />}
                    </Route>
                    <Route path="/sign-up">
                        {loggedIn ? <Redirect to="/" /> :
                            <Register
                                onLogin={setLoggedIn}
                                setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                            />}
                    </Route>
                    <Route exact path="/">
                        <Header
                            loggedIn={loggedIn}
                        />
                        <Main />
                        <Footer />
                    </Route>
                    <Route path="/*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
