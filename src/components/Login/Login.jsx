import './Login.css';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import auth from "../../utils/auth";
import { checkValidEmail, checkValidPassword } from "../../utils/validation";

function Login({ onLogin, setIsUpdateCurrentUser }) {
    const [email, setEmail] = React.useState("");
    const [isShowEmailError, setIsShowEmailError] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [isShowPasswordError, setIsShowPasswordError] = React.useState(false);
    const [isValidPassword, setIsValidPassword] = React.useState(false);

    const [isFormValid, setFormValid] = React.useState(false);

    React.useEffect(() => {
        setFormValid(isValidEmail &&
            isValidPassword)
    }, [isValidEmail, isValidPassword]);

    const history = useHistory();

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
            .authorize(email, password)
            .then((data) => {
                localStorage.setItem("token", data.token);
                onLogin(true);
                setIsUpdateCurrentUser(true);
                history.push('/movies');
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
                alert(`Error: ${err}`);
            });
    }

    return (
        <div className="login">
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
                onSubmit={handleSubmit}>
                <h2 className="form__title">
                    ???????? ????????????!
                </h2>
                <div className="form__input-container">
                    <p className="form__label">
                        E-mail
                    </p>
                    <input
                        type="email"
                        name="emailFromFormLogin"
                        id="emailFromFormLogin"
                        className="form__input"
                        onChange={handleEmailChange}
                        required
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
                        name="passwordFromFormLogin"
                        id="passwordFromFormLogin"
                        className="form__input"
                        required
                        onChange={handlePasswordChange}
                        minLength="2"
                        maxLength="200"
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
                    className="form__button"
                    disabled={!isFormValid}
                >
                    ??????????
                </button>
                <p className="form__text">
                    ?????? ???? ?????????????????????????????????&nbsp;&nbsp;
                    <Link
                        to="/sign-up"
                        className="form__link"
                    >
                        ??????????????????????
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
