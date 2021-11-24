import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { DURATION_SHORT_FILM } from "../../utils/config";

function SavedMovies({ loggedIn, isLoading, allLikedMovies, setIsUpdateLikedMovies }) {

    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);

    const [cardList, setCardList] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState(allLikedMovies);

    const [messageError, setMessageError] = React.useState('');

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    React.useEffect(() => {
        const movies = localStorage.getItem("saved-movies");
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
        const movies = localStorage.getItem("saved-movies");
        if (!movies)
            setCardList(filteredMovies);
    }, [filteredMovies]);

    function search(searchWord) {
        setFilteredMovies([]);
        if (searchWord?.length > 0) {
            let filteredMovies = allLikedMovies?.filter((movie) => {
                return movie.nameRU.toUpperCase().includes(searchWord.toUpperCase());
            });
            if (filteredMovies?.length > 0) {
                setIsShowSearchError(false);
                localStorage.setItem('saved-movies', JSON.stringify(filteredMovies));
            } else {
                setMessageError('Ничего не найдено');
                setIsShowSearchError(true);
                localStorage.setItem('saved-movies', JSON.stringify(null));
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
                    isLoading={isLoading}
                    messageError={messageError}
                    isShowSearchError={isShowSearchError}
                />
                <MoviesCardList
                    cardList={cardList}
                    isShowedShortMovies={isShowedShortMovies}
                    allLikedMovies={allLikedMovies}
                    setIsUpdateLikedMovies={setIsUpdateLikedMovies}
                />
            </div>
            <Footer />
        </>
    );
}

export default SavedMovies;
