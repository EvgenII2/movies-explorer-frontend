import './Register.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function Register() {
    return (
        <div className="register">
            <Link to="/">
                <img src={logo} alt="логотип в шапке" className="login__logo" />
            </Link>
            <form name="loginForm" className="form">
                <h2 className="form__title">Добро пожаловать!</h2>
                <p className="form__label">Имя</p>
                <input
                    type="text"
                    name="nameFromFormRegister"
                    id="nameFromFormRegister"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="40"
                    defaultValue="Виталий"
                />
                <span
                    className="form__error"
                    id="nameFromFormRegister-error"
                />
                <p className="form__label">E-mail</p>
                <input
                    type="email"
                    name="emailFromFormRegister"
                    id="emailFromFormRegister"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="40"
                    defaultValue="pochta@yandex.ru"
                />
                <span
                    className="form__error"
                    id="emailFromFormRegister-error"
                />
                <p className="form__label">Пароль</p>
                <input
                    type="password"
                    name="passwordFromFormRegister"
                    id="passwordFromFormRegister"
                    className="form__input"
                    required
                    minLength="2"
                    maxLength="200"
                    defaultValue="1234"
                />
                <span
                    className="form__error"
                    id="passwordFromFormRegister-error"
                />
                <button
                    type="submit"
                    className="form-register__button"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.assign('http://localhost:3000/sign-in/');
                    }}
                >
                    Зарегистрироваться
                </button>
                <p className="form__text">
                    Уже зарегистрированы?&nbsp;
                    <Link to="/sign-in" className="form__link">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
