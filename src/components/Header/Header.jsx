import './Header.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import MenuMobile from '../MenuMobile/MenuMobile';
import logo from '../../images/header-logo.svg';
import burgerIcon from '../../images/burger-icon.svg';


function Header({ isAuthorized }) {
    const location = useLocation();
    const isMovies = location.pathname === "/movies";
    const isSavedMovies = location.pathname === "/saved-movies";
    const isMain = location.pathname === "/";

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const clickHandler = () => {
        setIsMenuOpened(!isMenuOpened)
    };

    return (
        <div className={isAuthorized ?
            "header header_background-color_transparent" :
            "header"}>
            <Link to="/">
                <img
                    src={logo}
                    alt="логотип в шапке"
                    className="header__logo"
                />
            </Link>
            {!isAuthorized ? (
                <nav className="header__link-container">
                    <Link className="header__link header__link_color_white" to="/sign-up">
                        Регистрация
                    </Link>
                    <Link className="header__link header__link_background-color_green" to="/sign-in">
                        Войти
                    </Link>
                </nav>
            ) : (
                <>
                    <button
                        type="button"
                        className="header__button-menu"
                        onClick={clickHandler}>
                        <img
                            src={burgerIcon}
                            alt="иконка меню"
                            className="header__burger-icon"
                        />
                    </button>
                    {isMenuOpened ?
                        <MenuMobile
                            clickHandler={clickHandler}
                            isMain={isMain}
                            isMovies={isMovies}
                            isSavedMovies={isSavedMovies}
                        /> :
                        (<nav className="header__link-container_is-authorized">
                            <Link className={isMovies ?
                                "header__link header__link_is-authorized" :
                                "header__link header__link_is-authorized header__link_not-actived"}
                                to="/movies">
                                Фильмы
                            </Link>
                            <Link className={isSavedMovies ?
                                "header__link header__link_is-authorized" :
                                "header__link header__link_is-authorized header__link_not-actived"}
                                to="/saved-movies">
                                Сохранённые фильмы
                            </Link>
                            <Link className="header__link header__link-accaunt" to="/profile">
                                Аккаунт
                            </Link>
                        </nav>)}

                </>
            )}

        </div >
    )
}

Header.propTypes = {
    isAuthorized: PropTypes.bool.isRequired
}

export default Header;
