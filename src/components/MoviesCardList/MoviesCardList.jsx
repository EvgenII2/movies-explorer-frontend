import "./MoviesCardList.css";
import React from "react";
import PropTypes from "prop-types";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cardList }) {
  return (
    <>
      <div className="movies-cardlist">
        {cardList &&
          cardList.map((card) => (
            <MoviesCard
              key={card.id}
              picture={card.picture}
              title={card.title}
              duration={card.duration}
              isChecked={card.isChecked}
            />
          ))}
      </div>
      <button type="button" className="movies-cardlist__add-movies-button">
        Ещё
      </button>
    </>
  );
}
MoviesCardList.propTypes = {
  cardList: PropTypes.arrayOf(
    PropTypes.shape({
      picture: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired,
      isShortMovie: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
export default MoviesCardList;
