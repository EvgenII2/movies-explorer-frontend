import "./MoviesCard.css";
// import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";
import deleteIcon from '../../images/delete-icon.svg';

function MoviesCard({ picture, title, duration, trailerLink, isShortFilm, isShowedShortMovies }) {
    // const [isLiked, setIsLiked] = React.useState(isChecked);
    // const location = useLocation();
    // const isSavedMovies = location.pathname === "/saved-movies";
    // function handleChange() {
    //     setIsLiked(!isLiked);
    // }

    return (
        (isShortFilm || !isShowedShortMovies) &&
        <div className="movies-card">
            <a
                href={trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="movies-card__image"
                    src={picture}
                    alt={`фото ${title}`}
                />
            </a >
            <div className="movies-card__info">
                <div className="movies-card__info-first-line">
                    <h2 className="movies-card__title">{title}</h2>
                    <button type="button" className="movies-card__delete-button">
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
                    // onChange={handleChange}
                    />
                </div>
                <p className="movies-card__duration">
                    {duration}
                </p>
            </div>

        </div>
    )
}

MoviesCard.propTypes = {
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trailerLink: PropTypes.string,
    duration: PropTypes.number.isRequired,
    isShortFilm: PropTypes.bool.isRequired,
    isShowedShortMovies: PropTypes.bool.isRequired,
};

MoviesCard.defaultProps = {
    // picture: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    trailerLink: '',
    // duration: PropTypes.number.isRequired,
    // isShortFilm: PropTypes.bool.isRequired,
    // isShowedShortMovies: PropTypes.bool.isRequired,
};

export default MoviesCard;
