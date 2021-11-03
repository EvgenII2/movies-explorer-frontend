import './Profile.css';
import React from 'react';

function Profile() {
    return (
        <div className="profile">
            <h1 className="profile__title">
                Привет, Виталий!
            </h1>
            <div className="profile__name-container">
                <p className="profile__name-label">
                    Имя
                </p>
                <input
                    readOnly
                    type="text"
                    className="profile__name-input"
                    defaultValue="Виталий"
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
                    defaultValue="pochta@yandex.ru"
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
    )
}

export default Profile;
