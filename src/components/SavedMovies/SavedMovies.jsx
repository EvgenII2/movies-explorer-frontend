import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import SearchForm from '../SearchForm/SearchForm';
import { DURATION_SHORT_FILM } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/MainApi";

function SavedMovies({ loggedIn, allLikedMovies, updateLikedFilms }) {

    const currentUser = React.useContext(CurrentUserContext);

    console.log(allLikedMovies)

    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);
    const [cardList, setCardList] = React.useState(allLikedMovies);
    const [allMovies, setAllMovies] = React.useState([]);
    const [messageError, setMessageError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    function search(searchWord) {
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
    }

    React.useEffect(() => {
        setAllMovies(allLikedMovies);
    }, [allLikedMovies]);

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
                    updateLikedFilms={updateLikedFilms}
                    allLikedMovies={allLikedMovies}
                    isShowedShortMovies={isShowedShortMovies}
                />
            </div>
            <Footer />
        </>
    );
}

export default SavedMovies;
