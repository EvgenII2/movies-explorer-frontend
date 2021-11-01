import "./MoviesCard.css";
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import React from "react";
import deleteIcon from '../../images/delete-icon.svg';

function MoviesCard({ picture, title, duration, isChecked }) {
  const [isLiked, setIsLiked] = React.useState(isChecked);
  const location = useLocation();
  const isSavedMovies = location.pathname === "/saved-movies";
  function handleChange() {
    setIsLiked(!isLiked);
  }

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={picture} alt={`фото ${title}`} />
      <div className="movies-card__info">
        <div className="movies-card__info-first-line">
          <h2 className="movies-card__title">{title}</h2>
          {isSavedMovies ?
            <button type="button" className="movies-card__delete-button">
              <img className="movies-card__delete-icon"
                src={deleteIcon}
                alt="исонка удалить"
              />
            </button> :
            <input
              type="checkbox"
              checked={isLiked}
              className="movies-card__checkbox-like"
              onChange={handleChange}
            />}

        </div>
        <p className="movies-card__duration">{duration}</p>
      </div>
    </article>
  );
}

MoviesCard.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MoviesCard;
