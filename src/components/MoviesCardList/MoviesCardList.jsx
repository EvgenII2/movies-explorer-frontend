import './MoviesCardList.css';
import React from 'react';
import cardList from '../../utils/tmpCardList';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {

    const tmpCardList = cardList;

    return (
        <>
            <div className="movies-cardlist">
                {tmpCardList.map((card) => (
                    <MoviesCard
                        key={card.id}
                        picture={card.picture}
                        title={card.title}
                        duration={card.duration}
                        isChecked={card.isChecked}
                    />
                ))}

            </div>
            <button
                type="button"
                className="movies-cardlist__add-movies-button">
                Ещё
            </button>
        </>
    )
}

export default MoviesCardList;
