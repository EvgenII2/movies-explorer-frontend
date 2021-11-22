import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { DURATION_SHORT_FILM } from "../../utils/config"
import { useEffect } from "react/cjs/react.development";

function Movies(
    { loggedIn,
        allMovies,
        allLikedMovies,
        setIsUpdateMovies,
        setIsUpdateLikedMovies,
        error,
        isLoading,
    }) {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);

    const [cardList, setCardList] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);

    const [messageError, setMessageError] = React.useState(error);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    useEffect(() => {
        if (isShowedShortMovies) {
            setCardList(filteredMovies?.filter((movie) => {
                return movie.duration < DURATION_SHORT_FILM;
            }));
        } else {
            setCardList(filteredMovies);
        }
    }, [isShowedShortMovies, filteredMovies])

    useEffect(() => {
        setCardList(filteredMovies);
    }, [filteredMovies])

    function search(searchWord) {
        setFilteredMovies([]);
        if (searchWord?.length > 0) {
            // setIsUpdateMovies(true);
            let filteredMovies = allMovies?.filter((movie) => {
                return movie.nameRU.includes(searchWord);
            });

            if (filteredMovies?.length > 0) {
                setIsShowSearchError(false);
            } else {
                setMessageError('Ничего не найдено');
                setIsShowSearchError(true);
            }
            setFilteredMovies(filteredMovies);
        } else {
            setMessageError('Нужно ввести ключевое слово');
            setIsShowSearchError(true);
        }
    }

    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <div className="movies">
                <SearchForm
                    changeHandler={showShortMoviesHandler}
                    searchHandler={search}
                    messageError={messageError}
                    isShowSearchError={isShowSearchError}
                />
                <Preloader
                    isLoading={isLoading}
                />
                {!isLoading &&
                    <MoviesCardList
                        cardList={cardList}
                        isShowedShortMovies={isShowedShortMovies}
                        allLikedMovies={allLikedMovies}
                        setIsUpdateLikedMovies={setIsUpdateLikedMovies}
                    />
                }
            </div>
            <Footer />
        </>
    );
}

export default Movies;
