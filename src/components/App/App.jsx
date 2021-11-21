import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
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

function App() {
    console.log('app')

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");
    const [isUpdateCurrentUser, setIsUpdateCurrentUser] = React.useState(false);

    const [allLikedMovies, setAllLikedMovies] = React.useState([]);
    const [isUpdateLikedMovies, setIsUpdateLikedMovies] = React.useState(true);
    const [allMovies, setAllMovies] = React.useState([]);
    const [isUpdateMovies, setIsUpdateMovies] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        console.log('updateUser');
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
    }, [isUpdateCurrentUser]);

    React.useEffect(() => {
        if (isUpdateLikedMovies) {
            api
                .getMovies()
                .then((res) => {
                    setAllLikedMovies(res.filter(movie => { return movie.owner === currentUser.id }));
                    setIsUpdateLikedMovies(false);
                    console.log('update');
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }, [currentUser.id, isUpdateLikedMovies]);

    React.useEffect(() => {
        if (isUpdateMovies) {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((res) => {
                    setAllMovies(res);
                    localStorage.setItem('movies', JSON.stringify(res));
                    setIsUpdateMovies(false);
                    setError("");
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    setIsLoading(false);
                    setError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
                });
        } else {
            const movies = localStorage.getItem("movies");
            setAllMovies(JSON.parse(movies));
        }
    }, [isUpdateMovies]);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            auth
                .tokenCheck(token)
                .then((resp) => {
                    setLoggedIn(true);
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
    }, []);

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
                        error={error}
                        isLoading={isLoading}
                        exact path="/movies"
                        component={Movies}
                    />
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        allLikedMovies={allLikedMovies}
                        setIsUpdateLikedMovies={setIsUpdateLikedMovies}
                        exact path="/saved-movies"
                        component={SavedMovies}
                    />
                    <ProtectedRoute
                        exact path="/profile"
                        loggedIn={loggedIn}
                        setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                        component={Profile}
                    />
                    <Route exact path="/sign-in">
                        <Login
                            onLogin={setLoggedIn}
                            setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                        />
                    </Route>
                    <Route exact path="/sign-up">
                        <Register
                            onLogin={setLoggedIn}
                            setIsUpdateCurrentUser={setIsUpdateCurrentUser}
                        />
                    </Route>
                    
                    <Route path="/">
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
