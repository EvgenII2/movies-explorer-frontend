import './Register.css';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import auth from "../../utils/auth";
import { checkValidName, checkValidEmail, checkValidPassword } from "../../utils/validation"

function Register() {
    const [email, setEmail] = React.useState("");
    const [isShowEmailError, setIsShowEmailError] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);

    const [name, setName] = React.useState("");
    const [isShowNameError, setIsShowNameError] = React.useState(false);
    const [isValidName, setIsValidName] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [isShowPasswordError, setIsShowPasswordError] = React.useState(false);
    const [isValidPassword, setIsValidPassword] = React.useState(false);

    const [isFormValid, setFormValid] = React.useState(false);

    useEffect(() => {
        setFormValid(isValidEmail &&
            isValidName &&
            isValidPassword)
    }, [isValidEmail, isValidName, isValidPassword])

    const history = useHistory();

    function handleNameChange(e) {
        const newName = e.currentTarget.value;
        if (checkValidName(newName) && newName.length > 1 && newName.length < 41) {
            setName(newName);
            setIsShowNameError(false);
            setIsValidName(true);
        }
        else {
            setIsShowNameError(true);
            setIsValidName(false);
        }
    }
    function handleEmailChange(e) {
        const newEmail = e.currentTarget.value;
        if (checkValidEmail(newEmail)) {
            setEmail(e.currentTarget.value);
            setIsShowEmailError(false);
            setIsValidEmail(true);
        }
        else {
            setIsShowEmailError(true);
            setIsValidEmail(false);
        }
    }
    function handlePasswordChange(e) {
        const newPassword = e.currentTarget.value;
        if (checkValidPassword(newPassword)) {
            setPassword(e.currentTarget.value);
            setIsShowPasswordError(false);
            setIsValidPassword(true);
        }
        else {
            setIsShowPasswordError(true);
            setIsValidPassword(false);
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        auth
            .register(email, name, password)
            .then((data) => {
                history.push("/sign-in");
            })
            .catch((err) => console.log(`Error: ${err}`));
    }

    return (
        <div className="register">
            <Link to="/">
                <img
                    src={logo}
                    alt="логотип в шапке"
                    className="login__logo"
                />
            </Link>
            <form
                name="loginForm"
                className="form"
                onSubmit={handleSubmit}
                autoComplete="false"
            >
                <h2 className="form__title">
                    Добро пожаловать!
                </h2>
                <div className="form__input-container">
                    <p className="form__label">
                        Имя
                    </p>
                    <input
                        type="text"
                        name="nameFromFormRegister"
                        id="nameFromFormRegister"
                        className="form__input"
                        required
                        onChange={handleNameChange}
                    />
                    {isShowNameError &&
                        <span
                            className="form__error"
                            id="nameFromFormRegister-error"
                        >
                            Не содержит только латиницу, кириллицу, пробел или дефис. Или меньше 2, или больше 40.
                        </span>
                    }
                </div>
                <div className="form__input-container">
                    <p className="form__label">
                        E-mail
                    </p>
                    <input
                        type="email"
                        name="emailFromFormRegister"
                        id="emailFromFormRegister"
                        className="form__input"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={handleEmailChange}
                    />
                    {isShowEmailError &&
                        <span
                            className="form__error"
                            id="nameFromFormRegister-error"
                        >
                            Не соответствует шаблону электронной почты
                        </span>
                    }
                </div>
                <div className="form__input-container">
                    <p className="form__label">
                        Пароль
                    </p>
                    <input
                        type="password"
                        name="passwordFromFormRegister"
                        id="passwordFromFormRegister"
                        className="form__input"
                        required
                        minLength="4"
                        maxLength="200"
                        onChange={handlePasswordChange}
                    />
                    {isShowPasswordError &&
                        <span
                            className="form__error"
                            id="nameFromFormRegister-error"
                        >
                            Не меньше 4, или не больше 200
                        </span>
                    }
                </div>
                <button
                    type="submit"
                    className="form-register__button"
                    disabled={!isFormValid}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.assign('http://localhost:3000/sign-in/');
                    }}
                >
                    Зарегистрироваться
                </button>
                <p className="form__text">
                    Уже зарегистрированы?&nbsp;
                    <Link
                        to="/sign-in"
                        className="form__link"
                    >
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
