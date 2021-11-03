import "./Movies.css";
import React from "react";
import cardList from "../../utils/tmpCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [tmpCardList, setTmpCardList] = React.useState(cardList);
    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };
    React.useEffect(() => {
        if (isShowedShortMovies) {
            setTmpCardList(cardList.filter((movie) => movie.isShortMovie));
        } else {
            setTmpCardList(cardList);
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

export default Movies;
