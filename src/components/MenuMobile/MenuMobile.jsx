import './MenuMobile.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import iconClose from '../../images/close-icon.svg';

function MenuMobile({ clickHandler, isSavedMovies, isMovies, isMain }) {

    const onClick = () => { clickHandler(); }

    return (
        <>
            <div className="menu-mobile__overlay" />
            <div className="menu-mobile__layout">
                <button type="button" onClick={onClick} className="menu-mobile__button-close">
                    <img src={iconClose} alt="иконка закрыть" className="menu-mobile__image-close" />
                </button>
                <div className="menu-mobile__links">
                    <Link className={isMain ? "menu-mobile__link menu-mobile__link_actived" : "menu-mobile__link"}
                        to="/" onClick={onClick}>
                        Главная
                    </Link>
                    <Link className={isMovies ? "menu-mobile__link menu-mobile__link_actived" : "menu-mobile__link"}
                        to="/movies" onClick={onClick}>
                        Фильмы
                    </Link>
                    <Link className={isSavedMovies ? "menu-mobile__link menu-mobile__link_actived" : "menu-mobile__link"}
                        to="/saved-movies" onClick={onClick}>
                        Сохранённые фильмы
                    </Link>
                </div>
                <Link className="menu-mobile__button-account" to="/profile" onClick={onClick}>
                    Аккаунт
                </Link>
            </div>
        </>
    )
}

MenuMobile.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    isSavedMovies: PropTypes.bool.isRequired,
    isMovies: PropTypes.bool.isRequired,
    isMain: PropTypes.bool.isRequired,
};

export default MenuMobile;

