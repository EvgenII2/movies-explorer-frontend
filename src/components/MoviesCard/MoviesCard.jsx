import "./MoviesCard.css";
import React, { useState } from "react";
import deleteIcon from '../../images/delete-icon.svg';
import api from "../../utils/MainApi";
import { BASE_URL } from "../../utils/config";
import { useLocation } from "react-router";

function MoviesCard({ movie, allLikedMovies, setIsUpdateLikedMovies }) {
    let srcIm = '';
    let link = '';
    const location = useLocation();
    const isSavedMovies = location.pathname === "/saved-movies";
    if (isSavedMovies) {
        srcIm = movie.image;
        link = movie.trailer;
    } else {
        srcIm = movie.image.url;
        link = movie.trailerLink;
    }

    const [isChecked, setIsChecked] = useState(allLikedMovies.filter(m => m.id === movie.id).length > 0);
    const [isRemoved, setIsRemoved] = useState(false);

    function onChange() {
        if (!isChecked) {
            api.addMovie(movie)
                .then((res) => {
                    console.log('ok, add', res._id);
                    setIsChecked(true);
                    setIsUpdateLikedMovies(true);
                    // alert(`Удалось.`);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    alert(`Не удалось. Error: ${err}`);
                });
        } else {
            const movieForRemove = allLikedMovies.find(m => m.id === movie.id);
            api.removeMovie(movieForRemove?._id)
                .then((res) => {
                    setIsUpdateLikedMovies(true);
                    console.log('ok, delete', res);
                    setIsChecked(false);
                    // alert(`Удалось.`);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    alert(`Не удалось. Error: ${err}`);
                });
        }
    }

    function onClick() {
        const movieForRemove = allLikedMovies.find(m => m.id === movie.id);
        api.removeMovie(movieForRemove?._id)
            .then((res) => {
                console.log('ok, delete');
                setIsUpdateLikedMovies(true);
                setIsRemoved(true);
                // alert(`Удалось.`);
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                alert(`Не удалось. Error: ${err}`);
            });
    }
    return (
        !isRemoved && (
            <div className="movies-card">
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        className="movies-card__image"
                        src={`${BASE_URL + srcIm}`}
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
                                checked={isChecked}
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
    )
}

export default MoviesCard;
