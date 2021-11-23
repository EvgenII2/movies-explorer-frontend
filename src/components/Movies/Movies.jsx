import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { DURATION_SHORT_FILM } from "../../utils/config"

function Movies(
    { loggedIn,
        allLikedMovies,
        setIsUpdateMovies,
        setIsUpdateLikedMovies,
        error,
        isLoading,
        allFilteredMovies,
        setWord,
        word
    }) {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);

    const [cardList, setCardList] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState(allFilteredMovies);

    const [messageError, setMessageError] = React.useState(error);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    React.useEffect(() => {
        const movies = localStorage.getItem("movies");
        if (movies?.length > 0)
            setFilteredMovies(JSON.parse(movies));
    }, []);

    React.useEffect(() => {
        if (isShowedShortMovies) {
            setCardList(filteredMovies?.filter((movie) => {
                return movie.duration < DURATION_SHORT_FILM;
            }));
        } else {
            setCardList(filteredMovies);
        }
    }, [isShowedShortMovies, filteredMovies]);

    React.useEffect(() => {
        if (allFilteredMovies?.length > 0) {
            setIsShowSearchError(false);
            localStorage.setItem('movies', JSON.stringify(filteredMovies));
            setFilteredMovies(allFilteredMovies);
        } else {
            if (word?.length > 0 && !isLoading) {
                setMessageError('Ничего не найдено');
                setIsShowSearchError(true);
                localStorage.setItem('movies', JSON.stringify(null));
            }
        }
    }, [filteredMovies, allFilteredMovies, word, isLoading]);

    function search(searchWord) {
        if (searchWord) {
            setIsUpdateMovies(true);
            setWord(searchWord);
            setFilteredMovies([]);
        } else {
            setMessageError('Нужно ввести ключевое слово');
            setIsShowSearchError(true);
        }
    };

    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <div className="movies">
                <SearchForm
                    changeHandler={showShortMoviesHandler}
                    searchHandler={search}
                    isLoading={isLoading}
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
