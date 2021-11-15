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

function App() {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);

    function onLogin(isLoggedIn) {
        setLoggedIn(isLoggedIn);
    }

    const history = useHistory();

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            auth
                .tokenCheck(token)
                .then((resp) => {
                    console.log(resp);
                    setLoggedIn(true);
                    setCurrentUser({ email: resp.email, name: resp.name });
                    history.push("/movies");
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    localStorage.removeItem("token");
                });
        } else setIsLoading(false);
    }, [history]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Switch>
                    <Route exact path="/sign-up">
                        <Register />
                    </Route>
                    <Route exact path="/sign-in">
                        <Login
                            loggedIn={loggedIn}
                            setCurrentUser={setCurrentUser}
                            onLogin={onLogin}
                        />
                    </Route>
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        currentUser={currentUser}
                        exact path="/movies"
                        component={Movies}
                    />
                    <ProtectedRoute
                        loggedIn={loggedIn}
                        currentUser={currentUser}
                        exact path="/saved-movies"
                        component={SavedMovies}
                    />
                    <ProtectedRoute
                        exact path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                    />
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
