import "./MoviesCard.css";
import PropTypes from "prop-types";
import React from "react";

function MoviesCard({ picture, title, duration, isChecked }) {
  const [isLiked, setIsLiked] = React.useState(isChecked);

  function handleChange() {
    setIsLiked(!isLiked);
  }

  return (
    <article className="movies-card">
      <img className="movies-card__image" src={picture} alt={`фото ${title}`} />
      <div className="movies-card__info">
        <div className="movies-card__info-first-line">
          <h2 className="movies-card__title">{title}</h2>
          <input
            type="checkbox"
            checked={isLiked}
            className="movies-card__checkbox-like"
            onChange={handleChange}
          />
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
