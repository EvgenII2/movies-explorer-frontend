import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MoviesCard from "../MoviesCard/MoviesCard";
import { BASE_URL, DURATION_SHORT_FILM } from "../../utils/constants"
import useLoadingNumber from "../../utils/useLoadingNumber";

function MoviesCardList({ cardList, isShowedShortMovies }) {

    const { loadingNumber } = useLoadingNumber();
    const [moviesNumber, setMoviesNumber] = useState(loadingNumber.firstLoadingNumber);

    const [filteredMovies, setFilteredMovies] = useState(cardList.slice(0, moviesNumber));

    const onClick = () => {
        // setFilteredMovies(cardList.slice(0, moviesNumber + loadingNumber.anotherLoadingNumber));
        setMoviesNumber(moviesNumber + loadingNumber.anotherLoadingNumber);
    }

    useEffect(() => {
        setFilteredMovies(cardList.slice(0, moviesNumber));;
    }, [moviesNumber, cardList]);

    return (
        <>
            <div className="movies-cardlist">
                {filteredMovies &&
                    filteredMovies.map((card) => (
                        <MoviesCard
                            key={card.id}
                            picture={`${BASE_URL + card.image.url}`}
                            title={card.nameRU}
                            duration={card.duration}
                            trailerLink={card.trailerLink}
                            isShortFilm={card.duration < DURATION_SHORT_FILM}
                            isShowedShortMovies={isShowedShortMovies}
                        />
                    ))
                }
            </div>

            <button
                type="button"
                className="movies-cardlist__add-movies-button"
                onClick={onClick}
            >
                Ещё
            </button>
        </>
    );
}
MoviesCardList.propTypes = {
    cardList: PropTypes.arrayOf(
        PropTypes.shape({
            picture: PropTypes.string,
            title: PropTypes.string,
            duration: PropTypes.number,
            id: PropTypes.number,
            trailerLink: PropTypes.string,
            // isChecked: PropTypes.bool.isRequired,
            // isShortMovie: PropTypes.bool.isRequired,
        })
    ).isRequired,
    isShowedShortMovies: PropTypes.bool.isRequired
};
export default MoviesCardList;
