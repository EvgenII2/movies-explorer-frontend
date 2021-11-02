import './Promo.css';
import React from 'react';
import logo from '../../images/promo-logo.svg';

function Promo() {
    return (
        <div className="promo">
            <img src={logo} alt="логотип в promo" className="promo__logo" />
            <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        </div>
    )
}

export default Promo;
