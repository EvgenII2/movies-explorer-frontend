import './Header.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';


function Header({ isAuthorized }) {
    return (
        <div className="header">
            <img src={logo} alt="логотип в шапке" className="header__logo" />
            <nav>
                {!isAuthorized ? (
                    <>
                        <Link className="header__link header__link_color_white" to="/sign-up">
                            Регистрация
                        </Link>
                        <Link className="header__link header__link_background-color_green" to="/sign-in">
                            Войти
                        </Link>
                    </>
                ) : (
                    <p>
                        is not Authorized
                    </p>
                )}
            </nav>
        </div >
    )
}
Header.propTypes = {
    isAuthorized: PropTypes.bool.isRequired
}

export default Header;
