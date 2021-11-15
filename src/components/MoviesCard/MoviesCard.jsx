import "./MoviesCard.css";
import React from "react";
import deleteIcon from '../../images/delete-icon.svg';
import api from "../../utils/MainApi";
import { BASE_URL } from "../../utils/constants";
import { useLocation } from "react-router";

function MoviesCard({ movie }) {

    const location = useLocation();
    const isSavedMovies = location.pathname === "/saved-movies";

    function onChange(e) {
        if (e.currentTarget.checked) {
            api.addMovie(movie)
                .then((res) => {
                    console.log('ok, add');
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        } else {
            api.removeMovie(movie.id)
                .then((res) => {
                    console.log('ok, delete');
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }

    }
    function onClick() {
        api.removeMovie(movie.id)
            .then((res) => {
                console.log('ok, delete');
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    }

    return (
        <div className="movies-card">
            <a
                href={movie.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="movies-card__image"
                    src={`${BASE_URL + movie.image.url}`}
                    alt={`фото ${movie.nameRU}`}
                />
            </a >
            <div className="movies-card__info">
                <div className="movies-card__info-first-line">
                    <h2 className="movies-card__title">{movie.nameRU}</h2>
                    {isSavedMovies ?
                        <button type="button" className="movies-card__delete-button" onClick={onClick}>
                            <img
                                className="movies-card__delete-icon"
                                src={deleteIcon}
                                alt="исонка удалить"
                            />
                        </button> :
                        <input
                            type="checkbox"
                            // checked={isLiked}
                            className="movies-card__checkbox-like"
                            onChange={onChange}
                        />
                    }
                </div>
                <p className="movies-card__duration">
                    {movie.duration}
                </p>
            </div>

        </div>
    )
}

export default MoviesCard;
