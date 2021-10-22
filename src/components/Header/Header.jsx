import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';


function Header() {
    return (
        <div className="header">
            <img src={logo} alt="логотип в шапке" className="header__logo" />
            <nav>
                <Link className="header__link header__link_color_white" to="/sign-up">
                    Регистрация
                </Link>
                <Link className="header__link header__link_background-color_green" to="/sign-in">
                    Войти
                </Link></nav>
        </div>
    )
}

export default Header;
