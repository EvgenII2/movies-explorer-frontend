import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { DURATION_SHORT_FILM } from "../../utils/constants";

function SavedMovies({ loggedIn, allLikedMovies, setIsUpdateLikedMovies }) {

    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);
    const [cardList, setCardList] = React.useState(allLikedMovies);
    const [messageError, setMessageError] = React.useState('');

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    function search(searchWord) {
        if (searchWord.length > 0) {
            let filteredMovies = cardList.filter((movie) => {
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
