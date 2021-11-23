import "./SearchForm.css";
import React, { useState } from "react";
import iconSearch from "../../images/search-icon.svg";

function SearchForm({ changeHandler, isLoading, searchHandler, messageError, isShowSearchError }) {

    const [searchWord, setSearchWord] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(searchWord, isLoading);
        searchHandler(searchWord);
    }
    const onInput = (ev) => {
        setSearchWord(ev.currentTarget.value);
    }

    return (
        <div className="search-form-container">
            <form
                name="searchForm"
                className="search-form"
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    name="filmFromSearchForm"
                    id="film-from-search-form"
                    className="search-form__input"
                    placeholder="Фильм"
                    onInput={onInput}
                    readOnly={isLoading}
                />
                <button
                    type="submit"
                    className="search-form__button"
                    disabled={isLoading}
                >
                    {!isLoading &&
                        <img
                            src={iconSearch}
                            className="search-form__icon"
                            alt="иконка поиска"
                        />}
                </button>

            </form>
            {isShowSearchError &&
                <span className="search-form__error">
                    {messageError}
                </span>
            }
            <div className="checkbox-container">
                <label
                    htmlFor="checkbox-films"
                    className="checkbox"
                >
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

export default SearchForm;
