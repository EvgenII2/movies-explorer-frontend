import "./SearchForm.css";
import React from "react";
import PropTypes from "prop-types";
import iconSearch from "../../images/search-icon.svg";

function SearchForm({ changeHandler }) {
  return (
    <div className="search-form-container">
      <form name="searchForm" className="search-form">
        <input
          type="text"
          name="filmFromSearchForm"
          id="film-from-search-form"
          className="search-form__input"
          required
          placeholder="Фильм"
        />
        <button type="submit" className="search-form__button">
          <img
            src={iconSearch}
            className="search-form__icon"
            alt="иконка поиска"
          />
        </button>
      </form>
      <div className="checkbox-container">
        <label htmlFor="checkbox-films" className="checkbox">
          <input
            type="checkbox"
            id="checkbox-films"
            className="checkbox__input"
            onChange={changeHandler}
          />
          <span className="checkbox__slider" />
        </label>
        <p className="checkbox-container__label">Короткометражки</p>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  changeHandler: PropTypes.func.isRequired,
};

export default SearchForm;
