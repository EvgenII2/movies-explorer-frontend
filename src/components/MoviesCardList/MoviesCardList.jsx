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
  // eslint-disable-next-line react/forbid-prop-types
  cardList: PropTypes.array.isRequired,
};
export default MoviesCardList;
