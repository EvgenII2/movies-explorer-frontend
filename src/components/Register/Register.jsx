import './Register.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import auth from "../../utils/auth";
import { checkValidName, checkValidEmail, checkValidPassword } from "../../utils/validation"

function Register({ onLogin, setIsUpdateCurrentUser }) {
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


    React.useEffect(() => {
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
                auth
                    .authorize(email, password)
                    .then((data) => {
                        localStorage.setItem("token", data.token);
                        setIsUpdateCurrentUser(true);
                        onLogin(true);
                        history.push('/movies');

                    })
                    .catch((err) => {
                        console.log(`Error: ${err}`);
                        alert(`Error: ${err}`);
                    });
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                alert(`Error: ${err}`);
            });
    }

    return (
        <div className="register">
            <Link to="/">
                <img
                    src={logo}
                    alt="?????????????? ?? ??????????"
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
                    ?????????? ????????????????????!
                </h2>
                <div className="form__input-container">
                    <p className="form__label">
                        ??????
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
                            ???? ???????????????? ???????????? ????????????????, ??????????????????, ???????????? ?????? ??????????. ?????? ???????????? 2, ?????? ???????????? 40.
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
                            ???? ?????????????????????????? ?????????????? ?????????????????????? ??????????
                        </span>
                    }
                </div>
                <div className="form__input-container">
                    <p className="form__label">
                        ????????????
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
                            ???? ???????????? 4, ?????? ???? ???????????? 200
                        </span>
                    }
                </div>
                <button
                    type="submit"
                    className="form-register__button"
                    disabled={!isFormValid}
                >
                    ????????????????????????????????????
                </button>
                <p className="form__text">
                    ?????? ?????????????????????????????????&nbsp;
                    <Link
                        to="/sign-in"
                        className="form__link"
                    >
                        ??????????
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register;
