import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import SearchForm from '../SearchForm/SearchForm';
import { DURATION_SHORT_FILM } from "../../utils/constants";
import api from "../../utils/MainApi";

function SavedMovies({ loggedIn }) {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [isShowSearchError, setIsShowSearchError] = React.useState(false);
    const [cardList, setCardList] = React.useState([]);
    const [allMovies, setAllMovies] = React.useState([]);
    const [messageError, setMessageError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    function search(searchWord) {
        if (searchWord.length === 0) {
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
        setIsLoading(true);
        api.getMovies()
            .then((res) => {
                setCardList(res);
                setAllMovies(res);
                console.log(res)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                setMessageError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                setIsShowSearchError(true);
                setIsLoading(false);
            });
    }, []);
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
                />
            </div>
            <Footer />
        </>
    );
}

export default SavedMovies;
