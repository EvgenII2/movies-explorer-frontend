import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
// import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ loggedIn }) {
    // const [isShowedShortMovies, setIsShowedShortMovies] = React.useState(false);
    // const [tmpCardList, setTmpCardList] = React.useState(cardList.filter(movie => movie.isChecked));
    // const showShortMoviesHandler = () => {
    //     setIsShowedShortMovies(!isShowedShortMovies);
    // };

    // React.useEffect(() => {
    //     if (isShowedShortMovies) {
    //         setTmpCardList(cardList.filter(movie => movie.isChecked && movie.isShortMovie));
    //     } else {
    //         setTmpCardList(cardList.filter(movie => movie.isChecked));
    //     }
    // }, [isShowedShortMovies, setTmpCardList]);
    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <div className="movies">
                {/* <SearchForm changeHandler={showShortMoviesHandler} /> */}
                <Preloader isActive />
                {/* <MoviesCardList cardList={tmpCardList} /> */}
            </div>
            <Footer />
        </>
    );
}

export default SavedMovies;
