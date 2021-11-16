import "./MoviesCard.css";
import React, { useState } from "react";
import deleteIcon from '../../images/delete-icon.svg';
import api from "../../utils/MainApi";
import { BASE_URL } from "../../utils/constants";
import { useLocation } from "react-router";


function MoviesCard({ movie, allLikedMovies, updateLikedFilms }) {
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

    let isChecked = allLikedMovies.filter(m => m.id === movie.id).length > 0;
    console.log(isChecked);
    function onChange() {
        console.log(movie)
        if (!isChecked) {
            console.log(movie)
            api.addMovie(movie)
                .then((res) => {
                    console.log('ok, add', res._id);
                    isChecked = !isChecked;
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        } else {
            api.removeMovie(movie._id)
                .then((res) => {
                    isChecked = !isChecked;
                    console.log('ok, delete');
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }
    }
    async function onClick() {
        api.removeMovie(movie._id)
            .then((res) => {
                console.log('ok, delete');
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
        // await updateLikedFilms()
    }
    console.log(isSavedMovies)
    return (
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
}

export default MoviesCard;
