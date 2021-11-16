import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { DURATION_SHORT_FILM } from "../../utils/constants"

function Movies({ loggedIn, allMovies, allLikedMovies, updateLikedFilms }) {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);
    const [cardList, setCardList] = React.useState([]);
    const [messageError, setMessageError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    async function search(searchWord) {
        setCardList([]);
        setIsLoading(true);
        if (searchWord.length > 0) {
            let filteredMovies = allMovies.filter((movie) => {
                return movie.nameRU.includes(searchWord);
            });
            if (isShowedShortMovies) {
                filteredMovies = filteredMovies.filter((movie) => {
                    return movie.duration < DURATION_SHORT_FILM;
                });
            }
            if (filteredMovies.length > 0) {
                setIsShowSearchError(false);
            } else {
                setMessageError('Ничего не найдено');
                setIsShowSearchError(true);
            }
            setCardList(filteredMovies);
        } else {
            setMessageError('Нужно ввести ключевое слово');
            setIsShowSearchError(true);
        }
        setIsLoading(false);
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
                <MoviesCardList
                    cardList={cardList}
                    isShowedShortMovies={isShowedShortMovies}
                    allLikedMovies={allLikedMovies}
                    updateLikedFilms={updateLikedFilms}
                />
            </div>
            <Footer />
        </>
    );
}

export default Movies;
