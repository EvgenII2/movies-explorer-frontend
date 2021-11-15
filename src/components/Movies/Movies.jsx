import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from '../../utils/MoviesApi';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({ loggedIn }) {
    const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    const [cardList, setCardList] = React.useState([]);
    const [allMovies, setAllMovies] = React.useState([]);

    const showShortMoviesHandler = () => {
        setIsShowedShortMovies(!isShowedShortMovies);
    };

    const searchMoviesHandler = (searchWord) => {
        setCardList(
            allMovies.filter((movie) => {
                const tmp = movie.nameRU.includes(searchWord);
                return tmp;
            })
        );
    }

    React.useEffect(() => {
        moviesApi.getMovies()
            .then((res) => { setAllMovies(res); })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }, []);
    // React.useEffect(() => {
    //     if (isShowedShortMovies) {
    //         setCardList(cardList.filter((movie) => movie.isShortMovie));
    //     } else {
    //         setCardList(cardList);
    //     }
    // }, [isShowedShortMovies, setCardList, cardList]);
    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <div className="movies">
                <SearchForm changeHandler={showShortMoviesHandler} searchHandler={searchMoviesHandler} />
                <Preloader isActive={false} />
                <MoviesCardList cardList={cardList} isShowedShortMovies={isShowedShortMovies} />
            </div>
            <Footer />
        </>
    );
}

export default Movies;
