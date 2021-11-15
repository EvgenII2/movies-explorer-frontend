import './Profile.css';
import React from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ loggedIn }) {
    const currentUser = React.useContext(CurrentUserContext);

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
                        readOnly
                        type="text"
                        className="profile__name-input"
                        value={currentUser.name}
                    />
                </div>
                <div className="profile__name-container">
                    <p className="profile__name-label">
                        E-mail
                    </p>
                    <input
                        readOnly
                        type="text"
                        className="profile__name-input"
                        value={currentUser.email}
                    />
                </div>
                <button
                    type="button"
                    className="profile__button"
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    className="profile__button"
                >
                    Выйти из аккаунта
                </button>
            </div>
        </>
    )
}

export default Profile;
