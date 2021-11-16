import './Profile.css';
import React, { useState } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from 'react-router';
import api from "../../utils/MainApi";

function Profile({ loggedIn }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [email, setEmail] = React.useState(currentUser.email);

    const [name, setName] = React.useState(currentUser.name);

    const [isReadOnly, setIsReadOnly] = useState(true);

    function handleNameChange(e) {
        const newName = e.currentTarget.value;
        setName(newName);

    }
    function handleEmailChange(e) {
        const newEmail = e.currentTarget.value;
        setEmail(newEmail);
    }

    const history = useHistory();

    const onClickOut = () => {
        localStorage.removeItem("token");
        console.log(localStorage)
        history.push("/sign-in");
    }

    const onClickEdit = () => {
        if (isReadOnly)
            setIsReadOnly(false);
        else {
            setIsReadOnly(true);
            api.editUser(name, email)
                .then((res) => {
                    currentUser.name = name;
                    currentUser.email = email;
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });

            console.log(name, email)
        }
    }
    return (
        <>
            <Header
                loggedIn={loggedIn}
            />
            <div className="profile">
                <h1 className="profile__title">
                    {`Привет, ${currentUser.name}!`}
                </h1>
                <div className="profile__name-container">
                    <p className="profile__name-label">
                        Имя
                    </p>
                    <input
                        readOnly={isReadOnly}
                        type="text"
                        className="profile__name-input"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="profile__name-container">
                    <p className="profile__name-label">
                        E-mail
                    </p>
                    <input
                        readOnly={isReadOnly}
                        type="text"
                        className="profile__name-input"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    type="button"
                    className="profile__button"
                    onClick={onClickEdit}
                >
                    {isReadOnly ? 'Редактировать' : 'Сохранить'}
                </button>
                <button
                    type="button"
                    className="profile__button"
                    onClick={onClickOut}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </>
    )
}

export default Profile;
