import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useLoadingNumber from "../../utils/useLoadingNumber";
import { useLocation } from "react-router";

function MoviesCardList({ cardList, allLikedMovies, updateLikedFilms }) {

    const location = useLocation();
    const isSavedMovies = location.pathname === "/saved-movies";

    const { loadingNumber } = useLoadingNumber();
    const [moviesNumber, setMoviesNumber] = useState(loadingNumber.firstLoadingNumber);

    const [filteredMovies, setFilteredMovies] = useState([]);

    const onClick = () => {
        setMoviesNumber(moviesNumber + loadingNumber.anotherLoadingNumber);
    }

    useEffect(() => {
        console.log(cardList);
        if (!isSavedMovies) {
            setFilteredMovies(cardList.slice(0, moviesNumber));
        } else {
            setFilteredMovies(cardList);
        }
    }, [moviesNumber, cardList, isSavedMovies]);

    return (
        <>
            <div className="movies-cardlist">
                {filteredMovies &&
                    filteredMovies.map((card) => (
                        <MoviesCard
                            key={card?._id || card?.id}
                            movie={card}
                            updateLikedFilms={updateLikedFilms}
                            allLikedMovies={allLikedMovies}
                        />
                    ))
                }
            </div>
            {cardList.length > moviesNumber &&
                !isSavedMovies &&
                <button
                    type="button"
                    className="movies-cardlist__add-movies-button"
                    onClick={onClick}
                >
                    Ещё
                </button>
            }
        </>
    );
}

export default MoviesCardList;
