import './Main.css';
import React from 'react';
import NavTab from '../NavTab/NavTab';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
    return (
        <div className="Main">
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
        </div>
    )
}

export default Main;

