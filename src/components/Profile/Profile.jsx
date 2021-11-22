import './Profile.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from 'react-router';
import api from "../../utils/MainApi";
import { checkValidName, checkValidEmail } from "../../utils/validation"

function Profile({ loggedIn, onLogin, setIsUpdateCurrentUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [email, setEmail] = useState(currentUser.email);
    const [isShowEmailError, setIsShowEmailError] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(true);

    const [name, setName] = useState(currentUser.name);
    const [isShowNameError, setIsShowNameError] = useState(false);
    const [isValidName, setIsValidName] = useState(true);

    const [isFormValid, setFormValid] = useState(false);
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        setFormValid(isValidEmail && isValidName);
    }, [isValidEmail, isValidName]);

    function handleNameChange(e) {
        const newName = e.currentTarget.value;
        setName(newName);
        if (checkValidName(newName) && newName.length > 1 && newName.length < 41) {
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
        setEmail(newEmail);
        if (checkValidEmail(newEmail)) {
            setIsShowEmailError(false);
            setIsValidEmail(true);
        }
        else {
            setIsShowEmailError(true);
            setIsValidEmail(false);
        }
    }

    const history = useHistory();

    const onClickOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("movies");
        console.log(localStorage);
        onLogin(false);
        setIsUpdateCurrentUser(true);
        history.push("/");
    }

    async function onClickEdit() {
        if (name !== currentUser.name && email !== currentUser.email) {
            setIsShowError(false);

            await api.editUser(name, email)
                .then((res) => {
                    currentUser.name = name;
                    currentUser.email = email;
                    alert("ok");
                    setIsUpdateCurrentUser(false);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                    alert(`Error: ${err}`);
                });

        } else {
            setIsShowError(true);
        }
    }


    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <form className="profile">
                <h1 className="profile__title">
                    {`Привет, ${currentUser.name}!`}
                </h1>
                {isShowError &&
                    <span
                        className="form__error"
                        id="nameFromFormRegister-error"
                    >
                        Данные не отличаются от изначальных
                    </span>
                }
                {isShowEmailError &&
                    <span
                        className="form__error"
                        id="nameFromFormRegister-error"
                    >
                        E-mail не соответствует шаблону электронной почты
                    </span>
                }
                {isShowNameError &&
                    <span
                        className="form__error"
                        id="nameFromFormRegister-error"
                    >
                        Имя не содержит только латиницу, кириллицу, пробел или дефис. Или меньше 2, или больше 40.
                    </span>
                }
                <div className="profile__name-container">
                    <p className="profile__name-label">
                        Имя
                    </p>
                    <input
                        type="text"
                        className="profile__name-input"
                        value={name}
                        required
                        onChange={handleNameChange}
                    />
                </div>
                <div className="profile__name-container">
                    <p className="profile__name-label">
                        E-mail
                    </p>
                    <input
                        type="text"
                        className="profile__name-input"
                        value={email}
                        required
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    type="button"
                    className="profile__button"
                    disabled={!isFormValid}
                    onClick={onClickEdit}
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    className="profile__button"
                    onClick={onClickOut}
                >
                    Выйти из аккаунта
                </button>
            </form>
        </>
    )
}

export default Profile;
