import './Login.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Login() {
    return (
        <div className="login">
            <Link to="/">
                <img
                    src={logo}
                    alt="логотип в шапке"
                    className="login__logo"
                />
            </Link>
            <form name="loginForm" className="form">
                <h2 className="form__title">
                    Рады видеть!
                </h2>
                <p className="form__label">
                    E-mail
                </p>
                <input
                    type="email"
                    name="emailFromFormLogin"
                    id="emailFromFormLogin"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="40"
                    defaultValue="pochta@yandex.ru"
                />
                <span
                    className="form__error"
                    id="emailFromFormLogin-error"
                />
                <p className="form__label">
                    Пароль
                </p>
                <input
                    type="password"
                    name="passwordFromFormLogin"
                    id="passwordFromFormLogin"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="200"
                    defaultValue="1234"
                />
                <span
                    className="form__error"
                    id="passwordFromFormLogin-error"
                />
                <button
                    type="submit"
                    className="form__button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.assign('http://localhost:3000/movies/');
                    }}
                >
                    Войти
                </button>
                <p className="form__text">
                    Ещё не зарегистрированы?&nbsp;&nbsp;
                    <Link
                        to="/sign-up"
                        className="form__link"
                    >
                        Регистрация
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
