import './SavedMovies.css';
import React from 'react';
import cardList from "../../utils/tmpCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [tmpCardList, setTmpCardList] = React.useState(cardList.filter(movie => movie.isChecked));
    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };
    React.useEffect(() => {
        if (isShowedShortMovies) {
            setTmpCardList(cardList.filter(movie => movie.isChecked && movie.isShortMovie));
        } else {
            setTmpCardList(cardList.filter(movie => movie.isChecked));
        }
    }, [isShowedShortMovies, setTmpCardList]);
    return (
        <div className="movies">
            <SearchForm changeHandler={showShortMoviesHandler} />
            <Preloader isActive={false} />
            <MoviesCardList cardList={tmpCardList} />
        </div>
    );
}

export default SavedMovies;
