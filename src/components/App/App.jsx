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

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");

    const [allLikedMovies, setAllLikedMovies] = React.useState([]);
    const [allMovies, setAllMovies] = React.useState([]);

    function onLogin(isLoggedIn) {
        setLoggedIn(isLoggedIn);
    }

    const history = useHistory();
    React.useEffect(() => {
        api
            .getMovies()
            .then((res) => {
                setAllLikedMovies(res.filter(movie => { return movie.owner === currentUser.id }));
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }, [currentUser.id]);

    React.useEffect(() => {
        const movies = localStorage.getItem("movies");
        if (!movies) {
            moviesApi.getMovies()
                .then((res) => {
                    setAllMovies(res);
                    localStorage.setItem('movies', JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);

                });
        } else {
            setAllMovies(JSON.parse(movies));
        }
    }, []);

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
                    // history.push("/");
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
                        updateLikedFilms={setAllLikedMovies}
                        path="/movies"
                        component={Movies}
                    />
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        allLikedMovies={allLikedMovies}
                        updateLikedFilms={setAllLikedMovies}
                        path="/saved-movies"
                        component={SavedMovies}
                    />
                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                    />
                    <Route path="/sign-up">
                        <Register />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            loggedIn={loggedIn}
                            setCurrentUser={setCurrentUser}
                            onLogin={onLogin}
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
